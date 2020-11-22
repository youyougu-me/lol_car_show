
//引入登录接口
import { Login } from "@/api/login"
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  token: localStorage.getItem("token") || '',
  username: localStorage.getItem("username") || '',
  //是否已获取用户权限(意思是有没有分配动态路由)
  roles: [],
  btns: []
}

const getters = {
  roles: state => state.roles,
  btns: state => state.btns

}
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_TOKEN(state, value) {
    state.token = value
  },
  SET_USERNAME(state, value) {
    state.username = value
  },
  //保存用户权限
  SET_ROLES(state, value) {
    state.roles = value
  },
  //保存用户权限
  SET_BTNS(state, value) {
    state.btns = value
  }
}

const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      Login(data).then(response => {
        let data = response.data.data
        //存储在状态管理器
        commit('SET_TOKEN', data.token)
        commit('SET_USERNAME', data.username)
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.username)
        resolve(response)
      }).catch(err => {
        //返回一个错误的函数
        reject(err)
      })
    })
  },
  exit({ commit }) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      commit("SET_TOKEN", '')
      commit("SET_USERNAME", '')
      //清空权限
      commit('SET_ROLES',[])
      resolve()
    })

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}