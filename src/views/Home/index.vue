<!--
 * @Author: Hank 
 * @Date: 2022-05-23 11:38:12
 * @LastEditors:  
 * @LastEditTime: 2022-06-01 19:39:55
 * @FilePath: /vue-universalplatform/src/views/Home/index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <el-row :gutter="5"
          class="home-wrapper">
    <!-- 左侧区域 -->
    <el-col :span="8"
            class="left-wrapper">
      <!-- 用户信息区域 -->
      <el-card class="user-card">
        <div class="user-wrapper">
          <img :src="userImg"
               alt="">
          <div class="user-info">
            <h3>Admin</h3>
            <span>超级管理员</span>
          </div>
        </div>
        <hr>
        <div class="login-wrapper">
          <div class="login-time">
            <span>上次登录时间：</span>
            <span>2022-05-24</span>
          </div>
          <div class="login-address">
            <span>上次登录地点：</span>
            <span>苏州</span>
          </div>
        </div>
      </el-card>
      <!-- 课程列表区域 -->
      <el-card class="course-card">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="name"
                           label="品牌">
          </el-table-column>
          <el-table-column prop="todayBuy"
                           label="今天购买">
          </el-table-column>
          <el-table-column prop="monthBuy"
                           label="本月购买">
          </el-table-column>
          <el-table-column prop="totalBuy"
                           label="总购买">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧区域 -->
    <el-col :span="16"
            class="rigth-wrapper">
      <!-- 订单销量区域 -->
      <div class="payment-wrapper">
        <div class="payment-card"
             v-for="item in countData"
             :key="item.name">
          <i :class="'el-icon-' + item.icon"
             :style="'background-color:' + item.color"></i>
          <div class="pay-info">
            <h2>￥{{ item.value }}</h2>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <!-- 品牌销量折线图 -->
      <el-card class="brand-echart-wrapper"
               body-style="height: 100%; padding: 0">
        <component-echarts echartsType="line"
                           :chartData="lineEChartData"></component-echarts>
      </el-card>
      <div class="bottom-echart-wrapper">
        <!-- 用户数量柱状图 -->
        <el-card class="user-echart-wrapper"
                 body-style="height: 100%; padding: 0">
          <component-echarts echartsType="bar"
                             :chartData="barEChartData"></component-echarts>
        </el-card>
        <!-- 销量饼状图 -->
        <el-card class="percent-echart-wrapper"
                 body-style="height: 100%; padding: 0">
          <component-echarts echartsType="pie"
                             :chartData="pieEChartData"></component-echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import ComponentEcharts from '@/components/ComponentEcharts.vue'
import Mock from 'mockjs'

export default {
  name: 'HomePage',
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [
          {
            name: 'oppo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: 'vivo',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '苹果',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '小米',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '三星',
            todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          },
          {
            name: '魅族',
           todayBuy: 100,
            monthBuy: 300,
            totalBuy: 800
          }
        ],
        countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartList: {},
      lineEChartData: {},
      barEChartData: {},
      pieEChartData: {},
    }
  },
  components: {
    ComponentEcharts
  },
  created () {
    this.echartList = this.getStatisticalData()
  }, 
  mounted () {
    // console.log(this.echartList);
    this.loadLineEChartData()
    this.loadBarEChartData()
    this.loadPieEChartData()
  },
  methods: {
    loadLineEChartData() {
       const order = this.echartList.data.orderData
       const xData = order.date
       const keyArr = Object.keys(order.data[0])
       const series = []
       keyArr.forEach(key => {
         series.push({
           name: key,
           data: order.data.map(item => item[key]),
           type: 'line'
         })
       })
       const option = {
         xAxis: {
           data: xData
         },
         grid: {
           left: '3%',
           right: '4%',
           bottom: '5%',
           containLabel: true
         },          
         color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
         series: series
       }
       this.lineEChartData = option
    },
    loadBarEChartData() {
       //["#2ec7c9", "#b6a2de"]
       const user = this.echartList.data.userData
       const xData = []
       const seriesData1 = []
       const seriesData2 = []
       // 对象item获取属性，还可以这样 item.date, item.new, item.active
       user.forEach(item => {
         xData.push(item["date"])
         seriesData1.push(item["new"])
         seriesData2.push(item["active"])
       })
       const option = {
         xAxis: {
           data: xData
         },
         grid: {
           left: '5%',
           right: '5%',
           bottom: '5%',
           containLabel: true
         },
         color: ["#2ec7c9", "#b6a2de"],
         series: [{
           data: seriesData1,
           type: 'bar',
           name: '新增用户'
         }, {
           data: seriesData2,
           type: 'bar',
           name: '活跃用户'
         }]
       }
       this.barEChartData = option
    },
    loadPieEChartData() {
      const option = {
        legend: {
          orient: 'vertical',
          left: 'left',
          padding: [10, 5, 0, 5]
        },
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362"
        ],
        series: [
          {
            type: 'pie',
            data: this.echartList.data.videoData,
            radius: '70%',
            center: ['55%', '50%'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
       }
       this.pieEChartData = option
    },
    getStatisticalData: () => {
      //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
      let List = []
      for (let i = 0; i < 7; i++) {
        List.push(
          Mock.mock({
            苹果: Mock.Random.float(100, 8000, 0, 0),
            vivo: Mock.Random.float(100, 8000, 0, 0),
            oppo: Mock.Random.float(100, 8000, 0, 0),
            魅族: Mock.Random.float(100, 8000, 0, 0),
            三星: Mock.Random.float(100, 8000, 0, 0),
            小米: Mock.Random.float(100, 8000, 0, 0)
          })
        )
      }
      return {
        code: 20000,
        data: {
          // 饼图
          videoData: [
            {
              name: '小米',
              value: 2999
            },
            {
              name: '苹果',
              value: 5999
            },
            {
              name: 'vivo',
              value: 1500
            },
            {
              name: 'oppo',
              value: 1999
            },
            {
              name: '魅族',
              value: 2200
            },
            {
              name: '三星',
              value: 4500
            }
          ],
          // 柱状图
          userData: [
            {
              date: '周一',
              new: 5,
              active: 200
            },
            {
              date: '周二',
              new: 10,
              active: 500
            },
            {
              date: '周三',
              new: 12,
              active: 550
            },
            {
              date: '周四',
              new: 60,
              active: 800
            },
            {
              date: '周五',
              new: 65,
              active: 550
            },
            {
              date: '周六',
              new: 53,
              active: 770
            },
            {
              date: '周日',
              new: 33,
              active: 170
            }
          ],
          // 折线图
          orderData: {
            date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
            data: List
          },
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  height: 100%;
  // 左侧区域
  .left-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;

    .course-card {
      // height: calc(100% - 205px);
      // height: 500px;
      flex: 1;
    }
  }
  .user-card {
    margin-bottom: 15px;
    .user-wrapper {
      display: flex;
      justify-items: flex-start;
      align-items: center;

      img {
        width: 81px;
        height: 100%;
        border-radius: 50%;
        margin-right: 20px;
      }

      .user-info {
        h3 {
          font-size: 23px;
          font-weight: 400;
        }

        span {
          font-size: 13px;
        }
      }
    }

    hr {
      margin-bottom: 20px;
    }

    .login-wrapper {
      font-size: 13px;
      .login-time {
        margin-bottom: 10px;
        & span:first-child {
          margin-right: 30px;
        }
      }

      .login-address {
        & span:first-child {
          margin-right: 30px;
          color: #fff;
          background-color: #25b3ff;
        }
      }
    }
  }


  // 右侧区域
  .rigth-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%    
  }
  // 订单销量区域
  .payment-wrapper {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-content: space-between;
    height: 115px;

    .payment-card {
      overflow: hidden;
      display: flex;
      justify-items: flex-start;
      align-items: center;
      width: calc(33% - 10px);
      height: 50px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 5px 0 rgb(227, 221, 221);
      i {
        display: block;
        width: 50px;
        height: 100%;
        color: white;
        margin-right: 10px;
        line-height: 50px;
        background-color: #2eabc1;
        text-align: center;
      }
      .pay-info {
        color: #000;
        & > h2 {
          font-size: 17px;
          margin-bottom: 2px;
        }
        & > span {
          font-size: 10px;
        }
      }
    }
  }  
  
  //品牌销量折线图
  .brand-echart-wrapper {
    flex: 1;
    width: 100%;
    margin: 15px auto;
  }  

  .bottom-echart-wrapper {
    display: flex;
    justify-content: space-between;
    flex: 1;
    
    // 用户数量柱状图
    .user-echart-wrapper {
      width: calc(50% - 9px);
    }
    // 销量饼状图
    .percent-echart-wrapper {
      width: calc(50% - 9px);
    }
  }
}
</style>