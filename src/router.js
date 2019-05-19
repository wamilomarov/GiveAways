import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import GiveAwaysList from "./views/GiveAwaysList";
import GiveAway from "./views/GiveAway";
import Callback from "./components/Callback";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/giveaways",
      name: "list",
      component: GiveAwaysList,
      props: true
    },
    {
      path: "/giveaways/:id",
      name: "giveaway",
      component: GiveAway,
      props: true
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
