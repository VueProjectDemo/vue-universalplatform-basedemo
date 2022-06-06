<!--
 * @Author: Hank
 * @Date: 2022-05-30 16:11:23
 * @LastEditors:  
 * @LastEditTime: 2022-05-31 18:50:26
 * @FilePath: /vue-universalplatform/src/components/ComponentForm.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <el-form ref="form"
           :model="form"
           label-width="100px"
           :inline="inline">
    <el-form-item v-for="item in formLabels"
                  :key="item.label"
                  :label="item.label">
      <el-input v-if="item.type === 'input'"
                v-model="form[item.model]"
                :placeholder="'请输入' + item.label">
      </el-input>
      <el-switch v-if="item.type === 'switch'"
                 v-model="form[item.model]">
      </el-switch>
      <el-date-picker v-if="item.type === 'date'"
                      type="date"
                      placeholder="选择日期"
                      v-model="form[item.model]"
                      style="width: 100%;">
      </el-date-picker>

      <el-select v-if="item.type === 'select'"
                 v-model="form[item.model]"
                 placeholder="请选择">
        <el-option v-for="opt in item.opts"
                   :key="opt.label"
                   :label="opt.label"
                   :value="opt.value"></el-option>
      </el-select>
    </el-form-item>
    <!-- 自定义插槽，用于其他表单元素 -->
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: this.originalForm
    }
  },
  props: {
    originalForm: {
      type: Object,
      default() { () => {} },
      required: true
    },
    formLabels: {
      type: Array,
      default() { () => [] },
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  mounted () {

  },
  methods: {
    resetForm() {
      console.log("重置表单");
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>