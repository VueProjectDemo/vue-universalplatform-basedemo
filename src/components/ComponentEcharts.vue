<!--
 * @Author: Hank
 * @Date: 2022-05-25 15:58:11
 * @LastEditors:  
 * @LastEditTime: 2022-05-27 16:35:31
 * @FilePath: /vue-universalplatform/src/components/ComponentEcharts.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="echart-wrapper"
       ref="echartRef"></div>
</template>

<script>
// 引入 ECharts 中所有的图表和组件
// import * as echarts from 'echarts'
// 按需引入
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart, BarChart, PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  LineChart,
  BarChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

// 引入工具包
import { debounce } from "../utils";

// 插件：监听DOM元素大小变化
// const elementResizeMaker = require('element-resize-detector')
let that;

export default {
  name: 'EChartPage',
  props: {
    echartsType: {
      type: String,
      default: 'line',
      required: true
    },
    chartData: {
      type: Object,
      default() {
        return { xData: [] }
      }
    }
  },
  data () {
    return {
      option:{
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
          padding: [10, 0, 0, 0]
        },
        // 提示框
        tooltip: {
          trigger: "axis",
          // 提示框遮挡问题：如果div高度过低，数据过多就会有遮挡现象，所以固定垂直方向
          // https://blog.csdn.net/qq_52140056/article/details/121122625
          // https://blog.csdn.net/wlangmood/article/details/75007378?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-75007378-blog-121122625.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-75007378-blog-121122625.pc_relevant_default&utm_relevant_index=1
          position: function(point, params, dom, rect, size) {
            return [point[0], '1%']
          }
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: {
          type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
        },
        series: [],
      },
      echartsEl: null
    }
  },
  watch: {
    chartData: {
      handler(newVal) {
        // 指定图表的配置项和数据
        // 使用刚指定的配置项和数据显示图表。
        if (this.echartsType === 'pie') {
          this.option = newVal       
        } else {
          this.option.xAxis.data = newVal.xAxis.data
          this.option.series = newVal.series
          this.option.grid = newVal.grid
        }
        if (this.echartsEl) {
          this.echartsEl.setOption(this.option)
        } else {
          this.initECharts()
          this.echartsEl.setOption(this.option)
        }
      },
      deep: true
    }
  },
  created () {
    that = this
  },
  mounted () {
    this.initECharts()
  },
  methods: {
    initECharts() {
      // 想通过 .children[0] 拿到第一个div元素，失败
      // console.log(this.$el.children);
      // console.log(this.$el.children[0]); //undefined
      // console.log(this.$el.children.length); //0
      // console.log(this.$el.firstElementChild); //null
      // console.log(Object.keys(this.$el.children)); //[]
      // 可通过原生JS获取DOM元素，或者通过jQuery获取
      // console.log(document.querySelector('.echart-wrapper'));

      if (!this.echartsEl) {
        const element = this.$refs.echartRef
        this.echartsEl = echarts.init(element);
        // 响应窗口大小的变化
        // ⚠️⚠️⚠️ 尽量不要使用flex,grid布局，会使resize()失效
        // 不错的方案：https://juejin.cn/post/6958979078594494495
        window.onresize = function() {
          that.echartsEl.resize();
          that.$nextTick(function() {
          })
        }
        // 想要DOM元素大小的变化
        // const detector = elementResizeMaker()
        // let elWidth = element.clientWidth
        // let elHeight = element.clientHeight
        // detector.listenTo(element, debounce(that.resizeDOM))

        // detector.listenTo(element, that.resizeDOM)

        // detector.listenTo(element, (el) => {
        //   console.log("重置图标大小");
        //   that.$nextTick(function() {
        //     that.echartsEl.resize();
        //   })
        // })
      }
    },
    // resizeDOM(el) {
    //   console.log("重置图标大小");
    //   that.$nextTick(function() {
    //     that.echartsEl.resize();
    //   })
    // } 
  }
}
</script>

<style lang="scss" scoped>
.echart-wrapper {
  width: 100%;
  height: 100%;
  // padding-top: .625rem;
  // box-sizing: border-box;
  // background-color: #999;
}
</style>