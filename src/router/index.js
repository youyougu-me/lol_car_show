import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
export const defaultRoutes = [
  {
    path: "/",
    redirect: "/layout",
    hidden: false
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      name: "登录"
    },
    hidden: true,
    component: () => import("../views/login/Index.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      name: "注册"
    },
    component: () => import("../views/register/Index.vue")
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("../views/layout/Index"),
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/layout/Index.vue")
      }
    ]

  },
  //404页面
  {
    path: "/page404",
    name: "Page404",
    meta: {
      name: "404",
    },
    hidden: true,
    component: () => import("../views/page404/Index.vue")
  }
]

//动态路由
export const asyncRoutes = [


]

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: defaultRoutes
});

export default router;
