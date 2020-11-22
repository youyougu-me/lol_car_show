import router from "./index"
import store from "../store/index"
import { Message } from "element-ui";

//添加白名单
const whiteRouter = ['/login', '/register','/index']

//路由守卫
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    if (to.path === '/login') {
      //清除本地存储
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      //清除仓库储存
      //上面已经引入 把状态里面token值设置为空
      store.commit("login/SET_TOKEN", '')
      store.commit("login/SET_USERNAME", '')
      next()
    } else {
      //判断是否已经做了动态路由了,避免重复获取
      //不管是角色还是按钮,这些权限都是一起获取的
      if (store.getters["login/roles"] == undefined || store.getters["login/roles"].length == 0) {
        //去做权限
        store.dispatch("permission/getRole", {}).then(res => {
          //这里有可能token过期
          // console.log(res);
          //.catch去处理

          const userRoles = res.data.data.role
          const userBtns = res.data.data.btnPerm
          store.commit("login/SET_BTNS", userBtns)
          //存在login里面
          store.commit("login/SET_ROLES", userRoles)
          //存了之后再去获取动态路由
          store.dispatch("permission/createRouters", userRoles).then(() => {
            //把拼接好的路由拿出来
            let ownRoutes = store.getters['permission/ownRoutes']
            let allRoutes = store.getters['permission/allRoutes']
            router.options.routes = allRoutes
            router.addRoutes(ownRoutes)
            next({ ...to, replace: true })
          })

        }).catch(err => {
          // console.log(err);
          //token过期
          if (err.resCode == 1040) {
            next('/login')
            Message({
              type: 'error',
              message: "请重新登录"
            })
          }
        })

      } else {
        next()
      }

    }

  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      //有放行就会结束
      next()
    } else {
      next('/login')
    }
  }
})
