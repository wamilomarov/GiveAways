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
import apiService from "./services/data";

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
      apiService.syncUser(data.profile)
              .then((response) => {
                if (response.status == 200 || response.status == 201)
                {
                  localStorage.setItem("profile", JSON.stringify(response.data));
                }
              });

    }
  }
};
</script>
