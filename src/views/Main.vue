<!--
 * @Author:  
 * @Date: 2022-05-24 17:23:49
 * @LastEditors:  
 * @LastEditTime: 2022-05-27 17:15:02
 * @FilePath: /vue-universalplatform/src/views/Main.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <el-container>
    <!-- 侧边菜单栏 -->
    <el-aside :width="asideWidth + 'px'">
      <component-aside ref="asideRef"></component-aside>
    </el-aside>
    <el-container>
      <!-- 顶部区域 -->
      <el-header>
        <component-header></component-header>
      </el-header>
      <!-- 导航标签 -->
      <component-tags class="tags-wrapper"></component-tags>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ComponentAside from '@/components/ComponentAside.vue'
import ComponentHeader from '@/components/ComponentHeader.vue'
import ComponentTags from '@/components/ComponentTags.vue'
import { mapState } from "vuex";

export default {
  name: 'MainPage',
  data () {
    return {
      asideWidth: 190,
    }
  },
  components: {
    ComponentAside,
    ComponentHeader,
    ComponentTags
  },
  computed: {
    ...mapState({
      isCollapse: state => state.tab.isCollapse
    }),
  },
  watch: {
    isCollapse: {
      handler(newVal) {
        this.asideWidth = newVal ? 64 : 200
        this.$refs.asideRef.title = newVal ? '系统' : '通用后台管理系统'
      },

      deep: true //深度监听
    }
  },
  created () {

  }, 
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: #545c64;
    transition:width 0.2s;
    -moz-transition:width 0.2s; /* Firefox 4 */
    -webkit-transition:width 0.2s; /* Safari and Chrome */
    -o-transition:width 0.2s; /* Opera */
  }
  .el-header {
    background-color: #262626;
  }
  .tags-wrapper {
    padding-top: 20px;
    padding-left: 20px;
  }
  .el-main {
    height: 100%;
    box-sizing: border-box;
  }
}
</style>