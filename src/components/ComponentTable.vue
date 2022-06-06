<!--
 * @Author: Hank
 * @Date: 2022-05-30 18:44:09
 * @LastEditors:  
 * @LastEditTime: 2022-05-31 18:14:13
 * @FilePath: /vue-universalplatform/src/components/ComponentTable.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="table-wrapper">
    <el-table :data="tableData"
              :height="tableHeight"
              border
              stripe
              style="width: 100%">
      <template v-for="item in tableColumn">
        <el-table-column v-if="item.slotname !== undefined && item.slotname.length > 0"
                         :key="item.prop"
                         :label="item.label"
                         :width="item.width"
                         align="center">
          <template slot-scope="scope">
            <slot :index="scope.$index"
                  :row="scope.row"
                  :name="item.slotname">
            </slot>
          </template>
        </el-table-column>
        <el-table-column v-else
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         align="center">
        </el-table-column>
      </template>
      <!-- <el-table-column v-for="item in tableColumn"
                       :key="item.prop"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width">
        <template v-if="item.slotname !== undefined && item.slotname !== null"
                  slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
          <slot :index="scope.$index"
                :row="scope.row"
                :name="item.slotname">
          </slot>
        </template>
      </el-table-column>
      <el-table-column v-if="isOperation"
                       label="操作"
                       width="150"
                       min-width="150">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() { () => []},
      required: true
    },
    tableColumn: {
      type: Array,
      default() { () => []},
      required: true
    },
    tableHeight: {
      type: String,
      default: '100%'
    },
    isOperation: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      
    }
  },
  components: {

  },
  methods: {
    //编辑
    handleEdit(index, item) {
      this.$emit('edit', index, item)
    },
    //删除
    handleDelete(index, item) {
      this.$emit('delete', index, item)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  height: 100%;

  .el-table {
    margin-top: 10px;
  }
}
</style>