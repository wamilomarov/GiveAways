<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md6>
            <v-menu
                    v-model="from"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="fromDate"
                            label="From"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="fromDate" @input="from = false"></v-date-picker>
            </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md6>
            <v-menu
                    v-model="to"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="toDate"
                            label="To"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="toDate" @input="to = false" :allowed-dates="allowedDates"></v-date-picker>
            </v-menu>

        </v-flex>
        <v-spacer></v-spacer>
    </v-layout>
</template>

<script>
    export default {
        name: "DateRangePicker",
        data: () => ({
            fromDate: new Date().toISOString().substr(0, 10),
            toDate: new Date().toISOString().substr(0, 10),
            from: false,
            to: false,
        }),
        methods: {
            allowedDates (val) {return new Date(val) > new Date(this.fromDate)}
        }

    }
</script>

<style scoped>

</style>