import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import login from './modules/login'
import info from './modules/info'
import permission from './modules/permission'

export default new Vuex.Store({
  modules: {
    login,
    info,
    permission
  }
});

