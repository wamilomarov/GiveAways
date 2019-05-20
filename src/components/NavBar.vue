<template>
    <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <router-link :to="{ name: 'list' }" tag="button" class="font-weight-light">
                Give Aways
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
                flat
                solo-inverted
                prepend-icon="search"
                label="Search"
                class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-chip v-if="isAuthenticated">
            <v-avatar>
                <img :src="profile.profile_picture" :alt="profile.full_name">
            </v-avatar>
            {{ profile.full_name }}
        </v-chip>
        <v-btn
                v-if="!isAuthenticated"
                flat
                @click.prevent="authenticate"
        >
            <span class="mr-2">Login</span>
        </v-btn>
        <v-btn
                v-if="isAuthenticated"
                flat
                @click.prevent="logout"
        >
            <span class="mr-2">Logout</span>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "NavBar",
        computed: {
            profile() {
                return this.$auth.profile;
            }
        },
        props: {
            isAuthenticated: Boolean
        },
        methods: {
            authenticate() {
                window.location.replace("https://api.instagram.com/oauth/authorize/?client_id=8f587eb53ac14708b6da20ef49ab9f95&redirect_uri=http://localhost:8080/callback&response_type=token");
            },
            logout() {
                this.$auth.logOut();
            }
        }
    }
</script>

<style scoped>

</style>