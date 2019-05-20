<template>
    <v-flex xs10 offset-xs1>
        <v-stepper v-model="currentStep">
            <v-stepper-header>
                <v-stepper-step :complete="currentStep > 1" step="1">Main info</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="currentStep > 2" step="2">Rules</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Dates</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-flex xs6 offset-xs3>
                        <v-text-field
                                v-model="giveaway.title"
                                :rules="validators.title"
                                :counter="150"
                                label="Title"
                                required
                        ></v-text-field>
                        <v-textarea

                                v-model="giveaway.description"
                                name="description"
                                :rules="validators.title"
                                :counter="150"
                                label="Description"
                                required
                        ></v-textarea>
                        <img :src="giveaway.image" height="150" v-if="giveaway.image"/>
                        <v-text-field label="Select Image" @click='pickFile' v-model='giveaway.image'
                                      prepend-icon='attach_file'></v-text-field>
                        <input
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                        >
                    </v-flex>

                    <v-btn
                            color="primary"
                            @click="currentStep = 2"
                    >
                        Continue
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-layout row wrap>
                        <v-flex px0 xs12>
                            <v-checkbox
                                    v-model="selectedRules"
                                    label="Like sponsors"
                                    value="like_sponsors"
                            ></v-checkbox>
                            <v-combobox
                                    v-if="selectedRules.includes('like_sponsors')"
                                    v-model="sponsors"
                                    item-value="username"
                                    label="Sponsors"
                                    multiple
                                    chips
                                    clearable
                                    :return-object="false"
                            ></v-combobox>
                        </v-flex>
                        <v-flex px0 xs12>
                            <v-checkbox
                                    v-model="selectedRules"
                                    label="Comment post"
                                    value="comment_post"
                            ></v-checkbox>
                            <v-flex xs12>
                                <v-text-field
                                        v-if="selectedRules.includes('comment_post')"
                                        v-model="rules.comment_post.post"
                                        label="Post Link"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-flex>
                    </v-layout>

                    <v-btn
                            color="primary"
                            @click="currentStep = 3"
                    >
                        Continue
                    </v-btn>

                    <v-btn
                            @click="currentStep = 1"
                            flat
                    >
                        Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-flex>
                        <DateRangePicker/>
                    </v-flex>

                    <v-btn
                            v-if="!isProcessing"
                            color="primary"
                            @click="submitGiveAway"
                    >
                        Continue
                    </v-btn>
                    <v-btn
                            v-if="!isProcessing"
                            @click="currentStep = 2"
                            flat
                    >
                        Cancel
                    </v-btn>
                    <v-progress-linear :indeterminate="true" v-if="isProcessing"></v-progress-linear>

                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <v-snackbar
                v-model="snackbar.show"
                :bottom="true"
                :multi-line="true"
                :right="true"
                :timeout="6000"
        >
            {{ snackbar.text }}
            <v-btn
                    color="pink"
                    flat
                    @click="snackbar.show = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-flex>

</template>

<script>
    import DateRangePicker from "./DateRangePicker";
    import apiService from "../services/data";

    export default {
        name: "GiveawayForm",
        components: {DateRangePicker},
        methods: {
            submitGiveAway() {
                let formToSubmit = new FormData();
                this.isProcessing = true;
                formToSubmit.append('title', this.giveaway.title);
                formToSubmit.append('description', this.giveaway.description);
                formToSubmit.append('start', this.giveaway.start);
                formToSubmit.append('end', this.giveaway.end);
                formToSubmit.append('author', this.$auth.profile.id);
                formToSubmit.append('image', this.image);
                if (this.selectedRules.length > 0)
                {
                    for(let i = 0; i < this.selectedRules.length; i++){
                        if (this.selectedRules[i] === 'like_sponsors'){
                            let sponsors = [];
                            this.giveaway.rules = [];

                            for (let i = 0; i < this.sponsors.length; i++)
                            {
                                sponsors.push({username: this.sponsors[i]});
                            }
                            this.rules[this.selectedRules[i]].sponsors = sponsors;
                        }
                        this.giveaway.rules.push(this.rules[this.selectedRules[i]]);
                    }
                    formToSubmit.append('rules', JSON.stringify(this.giveaway.rules));
                }
                let that = this;
                setTimeout(function () {
                    let snackBarData = {
                        show: true,
                        text: 'Giveaway created successfully!'
                    }
                    apiService.postGiveaway(formToSubmit)
                        .then((response) => {
                            that.isProcessing = false;
                            that.snackbar = snackBarData;
                            this.$router.push("/");
                        })
                        .catch((error) => {
                            console.log(error);
                            that.isProcessing = false;
                            snackBarData.text = "Could not process your request.";
                            that.snackbar = snackBarData;
                        });

                }, 1500);

            },
            pickFile () {
                this.$refs.image.click ()
            },
            onFilePicked (e) {
                const files = e.target.files;
                if(files[0] !== undefined) {
                    // this.imageName = files[0].name;
                    if(files[0].name.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ();
                    fr.readAsDataURL(files[0]);
                    fr.addEventListener('load', () => {
                        this.giveaway.image = fr.result;
                        let imageFile = files[0]; // this is an image file that can be sent to server...
                        this.image = imageFile;
                    })
                } else {
                    this.image = null;
                    this.giveaway.image = '';
                }
            }
        },
        data() {
            return {
                isProcessing: false,
                snackbar: {
                    show: false,
                    text: ""
                },
                currentStep: 0,
                validators: {
                    title: [
                        v => !!v || 'Name is required',
                        v => v.length <= 150 || 'Name must be less than 151 characters'
                    ],
                    description: [
                        v => !!v || 'Name is required',
                        v => v.length <= 250 || 'Name must be less than 10 characters'
                    ]
                },
                image: null,
                giveaway: {
                    title: "",
                    start: DateRangePicker.fromDateValue,
                    end: DateRangePicker.toDateValue,
                    image: "",
                    description: "",
                    rules: [],
                    creator_id: this.$auth.profile.id,
                },
                rules: {
                    like_sponsors:
                        {
                            name: 'Like sponsors',
                            key: 'like_sponsors',
                            post: '',
                            sponsors: []
                        },
                    comment_post:
                        {
                            name: 'Comment post',
                            key: 'comment_post',
                            post: '',
                            sponsors: []
                        }
                },
                selectedRules: [],
                sponsors: []

            }
        }
    }
</script>

<style scoped>

</style>