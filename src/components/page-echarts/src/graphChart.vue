<template>
  <div>
    <baseEchart :options="options"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/base-ui/echart'
// import * as echarts from 'echarts'
const options: any = {
  series: [
    {
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 400,
        edgeLength: 10
      },
      symbolSize: 100,
      label: {
        show: true,
        fontWeight: 'bold',
        color: '#fff'
      },

      data: [
        {
          name: '总成绩',
          label: {
            show: true,
            fontWeight: 'bold',
            color: '#fff',
            formatter: '{b}\n\n12/99'
          },
          value: 100,
          symbolSize: 150,
          x: 400,
          y: 300,
          itemStyle: {
            color: '#4169E1'
          }
        },
        {
          name: '课程',
          x: 550,
          y: 300,
          symbolSize: 100,
          itemStyle: {
            color: '#FFD700'
          }
        },
        {
          name: '以赛促学',
          x: 446,
          y: 442,
          symbolSize: 80,
          itemStyle: {
            color: '#30ECA6'
          }
        },
        {
          name: '项目指标',
          x: 278,
          y: 388,
          itemStyle: {
            color: '#E6E6FA'
          }
        },
        {
          name: '西南',
          x: 278,
          y: 211,
          itemStyle: {
            color: '#87CEFA'
          }
        },
        {
          name: '华北',
          x: 446,
          y: 157,
          value: 1000,
          symbolSize: 70,
          itemStyle: {
            color: '#00BFFF'
          }
        }
        // {
        //   name: '华东',
        //   x:0,
        //   y:0,
        //   symbolSize: 100,
        //   itemStyle: {
        //     color: '#7B68EE'
        //   }
        // }
      ]
    }
  ]
}
</script>

<style></style>
