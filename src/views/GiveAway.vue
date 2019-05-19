<template>
    <v-container>
        <v-jumbotron>
            <v-container>
                <v-layout align-center>
                    <v-flex>
                        <v-img :src="giveaway.image" max-width="500" aspect-ratio="1.7" contain></v-img>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-jumbotron>
        <h3 class="display-2 mb-3" >{{ giveaway.title }}</h3>
        <div class="title mb-3">by {{ giveaway.creator.username }}</div>
        <span class="subheading">{{ giveaway.description }}</span>

        <v-divider class="my-3"></v-divider>

        <div class="title mb-3">Rules</div>

        <ul class="mb-2">
            <li v-for="rule in giveaway.rules">
                {{rule.rule.name}}
            </li>
        </ul>


        <v-btn
                class="mt-2"
                color="primary"
                large
        >
            Join
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "GiveAway",
        props: {
            giveaway: {
                id: Number,
                title: String,
                start: Date,
                end: Date,
                image: String,
                description: String,
                creator: {
                    id: Number,
                    full_name: String,
                    username: String
                },
                rules: Array
            }
        }
    }
</script>

<style scoped>

</style>