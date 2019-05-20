<template>
    <v-container>
        <v-layout>
            <GiveAwayForm/>
        </v-layout>
    </v-container>
</template>

<script>
    import GiveAwayForm from "../components/GiveAwayForm";
    // import instagram from "../services/instagram";

    export default {
        name: "Create",
        components: {
            GiveAwayForm
        },
        async created() {
            // console.log("sending..");
            // instagram.followProfile(1574083);
        }
    }
</script>

<style scoped>

</style>