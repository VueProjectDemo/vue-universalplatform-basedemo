/*
 * @Author: Hank
 * @Date: 2022-06-01 18:43:31
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 17:05:05
 * @FilePath: /vue-universalplatform/src/store/modules/user.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
//使用Cookie是为了防止页面刷新后 Vuex中数据丢失
import Cookie from 'js-cookie'

export const userModule = {
  state: () => ({
    // 登录token
    token: ''
  }),
  getters: {
    getToken(state) {
      return state.token || Cookie.get('token')
    }
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    }
  }
}