import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./icons";
import {buttonPermission} from "@/utils/isBtn"
import echarts from 'echarts'
import './plugin/vue-amap'


Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
Vue.prototype.btnPerm = buttonPermission
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


