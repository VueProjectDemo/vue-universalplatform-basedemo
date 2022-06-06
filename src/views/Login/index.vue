<!--
 * @Author: Hank 
 * @Date: 2022-05-23 13:48:39
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 18:46:21
 * @FilePath: /vue-universalplatform/src/views/Login/index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <el-form :model="form"
           status-icon
           ref="form"
           :rules="rules"
           label-width="100px"
           class="login-wrapper">
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名"
                  label-width="70px"
                  prop="username">
      <el-input type="input"
                v-model="form.username"
                autocomplete="off"
                placeholder="请输入账号">
      </el-input>
    </el-form-item>
    <el-form-item label="密码"
                  label-width="70px"
                  prop="password">
      <el-input type="password"
                v-model="form.password"
                autocomplete="off"
                placeholder="请输入密码">
      </el-input>
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button type="primary"
                 @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    login() {
      /**
       * 权限管理--菜单：
       * 根据账号动态添加路由
       * 账号 admin 可看到全部菜单
       * 账号 123456 仅能看到一部分菜单
       */
      let menu = [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'mall'
        }
      ]
      let token = 'aear3512adas'
      if (this.form.username === 'admin') {
        token = 'aear3512adasadmin'
        menu.push(          
          {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'user'
          },
          {
            label: '其他',
            icon: 'location',
            children: [
              {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'other/pageOne'
              },
              {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'other/pageTwo'
              }
            ]
          }
        )
      }
      if (this.form.username !== 'admin' && this.form.username !== '123456') {
        this.$message.warning('登录账号错误')
        return;
      }
      this.$store.commit('clearMenu')
      this.$store.commit('setMenu', menu)
      this.$store.commit('addMenu', this.$router)
      this.$store.commit('setToken', token)
      this.$router.replace({name: 'home'})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;

  .login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
    font-size: 25px;
  }

  .login-submit {
    margin: 10px auto 0px auto;
  }
}

</style>