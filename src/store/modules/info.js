
//引入一级信息分类请求接口
import { GetCategory } from "@/api/info"
const state = {
    detailData: JSON.parse(sessionStorage.getItem('detailData')) || ''
}

const getters = {
    detailData: state => state.detailData,
}
const mutations = {
    SET_DETAIL_DATA(state, detailData) {
        state.detailData = detailData
        sessionStorage.setItem("detailData", detailData)
    }
}

const actions = {
    getfirstCategoryList({ commit }, data) {
        return new Promise((resolve, reject) => {
            GetCategory(data).then(res => {
                resolve(res)
            }).catch(err => {
                //返回一个错误的函数
                reject(err)
            })
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