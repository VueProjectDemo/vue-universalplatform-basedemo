<!--
 * @Author: Hank
 * @Date: 2022-05-27 17:08:56
 * @LastEditors:  
 * @LastEditTime: 2022-05-27 17:59:40
 * @FilePath: /vue-universalplatform/src/components/ComponentTags.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div>
    <el-tag v-for="(item, index) in tabsList"
            :key="item.name"
            :closable="item.name === 'home' ? false : true"
            :effect="(item.path === $route.path || (item.name === 'home' && $route.path === '/home')) ? 'dark' : 'plain'"
            @click="clickTag(item)"
            @close="closeTag(item, index)">{{ item.label }}</el-tag>
  </div>
</template>s

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState({
      tabsList: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations(['closeMenu']),
    // 点击标签
    clickTag(item) {
      this.$router.push({ path: item.path })
    },
    // 关闭标签
    closeTag(item, index) {
      console.log(index);
      this.closeMenu(item)
      if (this.$route.path !== item.path) {
        return
      }
      if (index == this.tabsList.length) {
        this.$router.push({ path: this.tabsList[index-1].path })
      } else {
        this.$router.push({ path: this.tabsList[index].path })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
</style>