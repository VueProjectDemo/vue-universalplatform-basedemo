/*
 * @Author:  
 * @Date: 2022-05-13 16:03:49
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 18:46:05
 * @FilePath: /vue-universalplatform/src/main.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import Vue from 'vue'
import App from './App.vue'
// 坑：1、export default xxx 导入时，不要加上 { xxx }
// import { router } from "./router";
import router from "./router";
import store from './store'

/**
 * 导入js文件
 */
import './plugins/element.js'
/**
 * 导入css文件
 */
import './assets/css/global.scss'
import './assets/less/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 每次刷新页面都会触发 create 方法，因为是SPA 单页面应用
  // 因为路由是动态设置的，所以刷新页面时未设置会导致页面空白，之前只是在登录时设置一次
  created() {
    console.log('重新加载')
    // console.log(router);
    // 防止刷新页面后整个页面空白，以及左侧菜单空白
    store.commit('addMenu', router)
  },
}).$mount('#app')
