import VueRouter from "vue-router";
import rules from "./rules";

// Views
const Login = () => import("./views/Login");
const Dashboard = () => import("./views/Dashboard");
const Post = () => import("./views/Post");

export default {
  getRoutes() {
    let router = new VueRouter({
      mode: "history",
      routes: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard,
          beforeEnter: rules.isLoggedIn 
        },
        {
          path: "/post/:id?",
          name: "post",
          component: Post,
          beforeEnter: rules.isLoggedIn
        },
        {
          path: "/login",
          name: "login",
          component: Login,
          // beforeEnter: rules.isGuest
        },
        {
          path: "*",
          redirect: "/login"
        }
      ]
    });
    router.beforeEach((to, from, next) => {
      next();
    });
    return router;
  }
};
