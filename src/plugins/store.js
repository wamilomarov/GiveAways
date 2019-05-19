import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        auth: {
            isAuthenticated: Boolean,
            profile: Object
        }
    },
    mutations: {
        insertUser (profile){
            this.state.auth.profile = profile;
            this.state.auth.isAuthenticated = true;
        }
    },
    getters: {
        auth: () => this.state.auth
    }
});
