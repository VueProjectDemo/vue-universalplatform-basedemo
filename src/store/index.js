/*
 * @Author: Hank 
 * @Date: 2022-05-23 17:20:35
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 17:14:26
 * @FilePath: /vue-universalplatform/src/store/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { tabModule } from "./modules/tab";
import { userModule } from "./modules/user";

// 挂载Vuex组件
Vue.use(Vuex)

// 创建一个新的store实例
const store = new Vuex.Store({
  modules: {
    tab: tabModule,
    user: userModule
  }
  // state() {
  //   return {
  //     count: 0
  //   }
  // },
  // mutations: {
  //   increment(state) {
  //     state.count += 1
  //   }
  // }
})

export default store