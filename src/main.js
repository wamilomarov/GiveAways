import Vue from "vue";
import Vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import AuthPlugin from "./plugins/auth";
import VueAxios from "vue-axios";
import axios from "axios";
import Vuex from "vuex";
import { store } from "./plugins/store";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios, Vuetify);
// Vue.use(Vuetify);

Vue.use(AuthPlugin);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  methods: {
    authenticate: function(provider) {
      this.$auth.authenticate(provider).then(function () {
        // Execute application logic after successful social authentication
      })
    }
  },
  render: h => h(App)
}).$mount("#app");


