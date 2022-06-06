<!--
 * @Author: Hank 
 * @Date: 2022-05-23 14:05:56
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 18:10:58
 * @FilePath: /vue-universalplatform/src/components/ComponentHeader.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="header">
    <!-- 左侧区域 -->
    <div class="left-wrapper">
      <el-button icon="el-icon-menu"
                 size="mini"
                 @click="collapseToggle"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tabsList"
                            :key="item.name"
                            :replace="true"
                            :to="{ path: item.path }">
          {{ item.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 右侧区域 -->
    <el-dropdown trigger="click"
                 class="right-wrapper"
                 size="mini"
                 @command="handleCommand">
      <img :src="userImg"
           alt="">
      <el-dropdown-menu slot="dropdown">
        <!-- 加上 .native 指组件绑定原生事件，即表明 @click 事件并非 el-dropdown-item 组件的自定义事件 -->
        <el-dropdown-item command="1">个人中心</el-dropdown-item>
        <el-dropdown-item command="2"
                          @click.native="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  data () {
    return {
      userImg: require('../assets/images/user.png') 
    }
  },
  computed: {
    ...mapState({
      tabsList: state => state.tab.tabsList
    })
  },
  mounted () {

  },
  methods: {
    ...mapMutations(['collapseChanged']),
    // 展开收缩菜单
    collapseToggle() {
      this.collapseChanged()
    },
    // 点击头像，弹出下拉菜单
    handleCommand(command) {
      // console.log(`点击了下拉菜单：${command}`);
    },
    logOut() {
      console.log('点击了退出按钮');
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.replace({name: 'login'})
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .left-wrapper {
    display: flex;
    align-items: center;
    color: #fff;

    .navigater-wrapper {
      margin-left: 15px;
    }

    .el-breadcrumb {
      margin-left: 15px;
      ::v-deep .el-breadcrumb__inner {
        color: #fff !important;
      }
    }
  }

  .right-wrapper {
    & > img {
      width: 41px;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>