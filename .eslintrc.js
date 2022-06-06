/*
 * @Author:
 * @Date: 2022-04-27 16:29:06
 * @LastEditors:  
 * @LastEditTime: 2022-05-23 13:35:00
 * @FilePath: /vue-universalplatform/.eslintrc.js
 * @Description:
 *
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved.
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
