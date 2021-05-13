import Vue from "vue";
import bootstrap from "./bootstrap";
// import moment from "moment";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
// Vue.prototype.moment = moment;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//init routes
const router = bootstrap.initRouter();

export const bus = new Vue({});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");






















