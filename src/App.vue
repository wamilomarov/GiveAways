<template>
  <v-app>
    <NavBar :is-authenticated="isAuthenticated" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      isAuthenticated: false
    };
  },
  async created(){
    if (this.$auth.isAuthenticated())
    {
      this.isAuthenticated = true;
      // this.$auth.getProfile();
    }

  }
  ,
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
      this.access_token = data.access_token;
    }
  }
};
</script>
