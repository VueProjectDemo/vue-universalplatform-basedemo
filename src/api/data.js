/*
 * @Author: Hank
 * @Date: 2022-05-17 15:34:26
 * @LastEditors:  
 * @LastEditTime: 2022-05-25 18:47:17
 * @FilePath: /vue-universalplatform/src/api/data.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import axios from './axios'

// export const getMenu = () => {
//   return axios.request({
//     url: 'menu',
//     method: 'get'
//   })
// }

export const getHome = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}

export const getMenu = (params) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params
  })
}
