

import { GetRole } from "@/api/role"
import { defaultRoutes, asyncRoutes } from "@/router"




const state = {
    allRoutes: defaultRoutes,
    ownRoutes: []
}

const getters = {
    allRoutes: state => state.allRoutes,
    ownRoutes: state => state.ownRoutes
}
const mutations = {
    SET_ROUTER(state, routes) {
        state.allRoutes = defaultRoutes.concat(routes)
        state.ownRoutes = routes
    }
}

const actions = {
    getRole({ commit }, data) {
        return new Promise((resolve, reject) => {
            GetRole(data).then(res => {
                resolve(res)
            }).catch(err => {
                //返回一个错误的函数
                reject(err)
            })
        })
    },

    createRouters({ commit }, data) {
        return new Promise((resolve, reject) => {
            //我只负责拼接好动态路由以及所有路由
            //然后保存到state中让别人来取
            //用来存放匹配好的动态路由
            let ownRoutes = []

            if (data.includes('admin')) {
                ownRoutes = asyncRoutes
            } else {
                ownRoutes = asyncRoutes.filter(item => {
                    if(item.meta&&item.meta.role){
                        if(data.includes(item.meta.role)){
                            return item
                        }
                    }
                })
                //404不带权限,匹配不到,任何人都应该加
                ownRoutes.push(asyncRoutes[asyncRoutes.length - 1])
            }
            //更新状态里面的路由
            //更新路由
            commit('SET_ROUTER', ownRoutes)
            //把此异步对象返回出去
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