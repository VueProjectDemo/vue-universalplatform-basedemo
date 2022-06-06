/*
 * @Author: Hank
 * @Date: 2022-05-26 19:08:02
 * @LastEditors:  
 * @LastEditTime: 2022-05-27 16:16:11
 * @FilePath: /vue-universalplatform/src/utils/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */

//防抖/节流函数
function debounce(fn, delay = 300) {
  let timer = null
  return function() {
    const _this = this
    const args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(_this, args)
    }, delay)
  }
}

export { debounce }