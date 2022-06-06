<!--
 * @Author: Hank
 * @Date: 2022-05-23 14:05:21
 * @LastEditors:  
 * @LastEditTime: 2022-06-06 17:49:09
 * @FilePath: /vue-universalplatform/src/components/ComponentAside.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="aside-menu">
    <!-- <div class="title">{{ title }}</div> -->
    <!-- 改进写法 -->
    <div class="title">{{ isCollapse ? '后台' : '通用后台管理系统' }}</div>
    <el-menu default-active="1"
             class="el-menu-vertical-demo"
             background-color="#545c64"
             text-color="#fff"
             :router="true"
             :collapse="isCollapse"
             :collapse-transition="false">
      <el-menu-item :index="item.name"
                    v-for="item in menuItemList"
                    :key="item.path"
                    @click="clickMenu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu index="1"
                  v-for="item in subMenuItemList"
                  :key="item.label">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item :index="subItem.path"
                      v-for="subItem in item.children"
                      :key="subItem.label"
                      @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{subItem.label}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AsideMenu',
  data () {
    return {
      title: '通用后台管理系统',
      // menuList: [
      //   {
      //     path: '/',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '商品管理',
      //     icon: 'video-play',
      //     url: 'mall'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user',
      //     url: 'user'
      //   },
      //   {
      //     label: '其他',
      //     icon: 'location',
      //     children: [
      //       {
      //         path: '/page1',
      //         name: 'page1',
      //         label: '页面1',
      //         icon: 'setting',
      //         url: 'other/pageOne'
      //       },
      //       {
      //         path: '/page2',
      //         name: 'page2',
      //         label: '页面2',
      //         icon: 'setting',
      //         url: 'other/pageTwo'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  computed: {
    // 是否缩小左侧菜单栏
    ...mapState({
      isCollapse: state => state.tab.isCollapse,
      menuList: state => state.tab.menu
    }),
    // 一级菜单
    menuItemList() {
      return this.menuList.filter( item => {
        if (!item.children && item.children !== 'undefined') {
          return item
        }
      })
    },
    // 二级菜单
    subMenuItemList() {
      return this.menuList.filter( item => {
        if (item.children && item.children.length > 0) {
          return item
        }
      })
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['selectMenu']),
    clickMenu(item) {
      this.selectMenu(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-menu {
  .title {
    color: #fff;
    height: 25px;
    line-height: 25px;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    margin: 15px 0px 0px;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
