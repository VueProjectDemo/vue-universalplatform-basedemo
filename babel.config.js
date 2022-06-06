/*
 * @Author: Hank
 * @Date: 2022-05-13 16:03:49
 * @LastEditors:  
 * @LastEditTime: 2022-05-13 16:10:36
 * @FilePath: /ProjectDemo/vue-universalplatform/babel.config.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
