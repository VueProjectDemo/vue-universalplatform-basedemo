<!--
 * @Author:  
 * @Date: 2022-05-13 16:03:49
 * @LastEditors:  
 * @LastEditTime: 2022-05-13 18:02:09
 * @FilePath: /ProjectDemo/vue-universalplatform/src/App.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <!-- 当浏览器不能解析js的时候显示noscript标签 -->
  <!-- <noscript>
    <strong>We're sorry but vue_shop doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
  </noscript> -->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
