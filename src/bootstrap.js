import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";

export default {
  initRouter() {
    Vue.use(VueRouter);
    return router.getRoutes();
  },
};
