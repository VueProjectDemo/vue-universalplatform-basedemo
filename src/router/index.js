/*
 * @Author:  Hank
 * @Date: 2022-05-13 16:44:45
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 18:42:23
 * @FilePath: /vue-universalplatform/src/router/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// router中无法使用 store -> undefined，使用 router.app.$store
// 这下面虽然没有用到 store，但是不能注释，否则会报错 undefined，getters
import { store } from "../store/index";

//1、Vue挂载路由插件
Vue.use(VueRouter)

//2、定义路由规则
// 这里的name是编程式路由时使用，如this.$router.push({ name: 'xxx'})
// this.$router：可以控制台打印，就能看的属性 options.routes，即下面的routes
const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/Login")
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/main',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import("../views/Home")
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import("../views/mall")
      },
      {
        path: '/user',
        name: 'user',
        component: () => import("../views/user")
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import("../views/other/pageOne.vue")
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import("../views/other/pageTwo.vue")
      }
    ]
  }
]

//3、创建路由实例并传递 `routes` 配置
const router = new VueRouter({
  //内部提供了 history 模式的实现。
  // mode: 'history',
  // mode: 'hash',
  routes
})

// 解决路由push重复报错：
// NavigationDuplicated: Avoided redundant navigation to current location: "/user".
const originalPush = VueRouter.prototype.push // 获取原型对象上push函数
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.onReady(() => {
  // 这部不足以解决刷新时，整个页面空白问题
  // router.app.$store.commit('addMenu', router)
})

router.beforeEach((to, from, next) => {
  // router.app.$store.commit('clearToken')
  const token = router.app.$store.getters.getToken
  console.log("token：" + token);
  // 没有token，且跳转页面非login
  if ((!token || token.length < 1) && to.name !== 'login') {
    // Error: Redirected when going from "/login" to "/home" via a navigation guard.
    // 出现重复的路由跳转
    next({name: 'login'})
    // next('login')
  } else if (token && to.name === 'login') {
    // 防止已登录状态，在浏览器输入/login 回到登录页面
    next({name: 'home'})
  } else {
    next()
  }
})

export default router
// 4、在main.js中将 router实例挂载到根实例