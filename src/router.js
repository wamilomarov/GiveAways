import Vue from "vue";
import Router from "vue-router";
import GiveAwaysList from "./views/GiveAwaysList";
import GiveAway from "./views/GiveAway";
import Callback from "./components/Callback";
import Create from "./views/Create";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "list",
      component: GiveAwaysList,
      props: true

    },
    {
      path: "/giveaways/:id",
      name: "giveaway",
      component: GiveAway,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        // axios
        //     .dispatch('event/fetchEvent', routeTo.params.id)
        //     .then(event => {
        //       routeTo.params.giveaway = event;
        //       next()
        //     })
        //     .catch(error => {
        //       if (error.response && error.response.status == 404) {
        //         next({ name: '404', params: { resource: 'event' } })
        //       } else {
        //         next({ name: 'network-issue' })
        //       }
        //     })
      }
    },
    {
      path: "/create",
      name: "giveawayForm",
      component: Create,
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
