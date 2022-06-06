<!--
 * @Author: Hank 
 * @Date: 2022-05-24 17:14:53
 * @LastEditors:  
 * @LastEditTime: 2022-06-01 17:29:38
 * @FilePath: /vue-universalplatform/src/views/user/index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="user-wrapper">
    <!-- 顶部区域--新增、搜索 -->
    <div class="top-wrapper">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addUser">新增</el-button>
      <div class="search-wrapper">
        <el-input v-model="keyword"
                  placeholder="请输入内容"></el-input>
        <el-button type="primary"
                   @click="searchKeyword">搜索</el-button>
      </div>
    </div>

    <!-- 用户列表 -->
    <component-table :tableData="tableData"
                     :tableHeight="'calc(100% - 50px)'"
                     :tableColumn="tableColumn"
                     :isOperation="true">
      <template #headImage="scope">
        <img :src="scope.row.headImgUrl"
             alt="头像"
             style="width: 45px; padding: 0; vertical-align: middle;">
      </template>
      <template #operation="{index, row}">
        <el-button size="mini"
                   @click="editUser(index, row)">编辑</el-button>
        <el-button size="mini"
                   type="danger"
                   @click="deleteUser(index, row)">删除</el-button>
        <!-- <el-popconfirm title="此操作将永久删除该文件，是否继续？"
                       @confirm="deleteUser(index, row)">
          <el-button size="mini"
                     type="danger"
                     slot="reference">删除</el-button>
        </el-popconfirm> -->

      </template>
    </component-table>

    <!-- 新增用户 -->
    <el-dialog :title="alertTitle"
               :visible.sync="dialogVisible"
               width="750px">
      <component-form ref="cform"
                      :formLabels="formLabels"
                      :originalForm="form"
                      :inline="true">
      </component-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary"
                   @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ComponentForm from '@/components/ComponentForm.vue'
import ComponentTable from '@/components/ComponentTable.vue'

export default {
  name: 'UserPage',
  data () {
    return {
      formLabels: [
        {
          label: '姓名',
          model: 'name',
          type: 'input'
        },
        {
          label: '年龄',
          model: 'age',
          type: 'input'
        },
        {
          label: '性别',
          model: 'gender',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 2
            }
          ]
        },
        {
          label: '出生日期',
          model: 'birthday',
          type: 'date'
        },
        {
          label: '地址',
          model: 'address',
          type: 'input'
        },
      ],
      form: {
        name: '',
        age: '',
        gender: '男',
        birthday: '1977-01-01',
        address: ''
      },
      alertTitle: '添加用户',
      tableData: [],
      tableColumn: [
        {
          prop: 'name',
          label: '姓名',
          width: 150
        },
        {
          label: '头像',
          width: 120,
          slotname: 'headImage'
        },
        {
          prop: 'age',
          label: '年龄',
          width: 100
        },
        {
          prop: 'gender',
          label: '性别',
          width: 100
        },
        {
          prop: 'birthday',
          label: '出生日期',
          width: 150
        },
        {
          prop: 'address',
          label: '地址',
          width: null
        },
        {
          label: '头像',
          width: 150,
          slotname: 'operation'
        }
      ],
      keyword: '',
      dialogVisible: false
    }
  },
  components: {
    ComponentForm,
    ComponentTable
  },
  created () {
    this.getUserList()
  },
  mounted () {

  },
  methods: {
    // 获取用户列表
    getUserList() {
      for (let index = 0; index < 20; index++) {
        this.tableData.push({
          name: '王小虎' + index,
          headImgUrl: require('@/assets/images/user-default.png'),
          age: `${18 + index}`,
          gender: '男',
          birthday: `2016-05-${index}`,
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
    },
    // 新增用户
    addUser() {  
      this.alertTitle = "新增用户"
      this.dialogVisible = true    
    },
    // 提交：新增表单
    onSubmit() {
      this.dialogVisible = false
    },
    //搜索用户
    searchKeyword() {
      
    },
    //编辑用户
    editUser(index, item) {
      // console.log(`编辑用户: ${index}, ${JSON.stringify(item)}`);
      this.alertTitle = "编辑用户"
      this.form = item
      this.dialogVisible = true
      // this.$nextTick(() => {
      //   this.form = item
      //   console.log(JSON.stringify(this.form));
      // })
    },
    //删除用户
    deleteUser(index, item) {
      console.log(`删除用户: ${index}, ${JSON.stringify(item)}`);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //关闭弹窗
    closeDialog() {
      this.dialogVisible = false
      console.log(this.$refs.cform);      
      this.$nextTick(() => {
        this.form = {}
      })
      this.$refs.cform.resetForm()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-wrapper {
  width: 100%;
  height: 100%;  
  //顶部区域
  .top-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-wrapper {
      display: flex;
      & > .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>