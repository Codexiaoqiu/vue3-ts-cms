<template>
  <div>
    <baseEchart :options="options"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/base-ui/echart'
import { convertData } from '../utils/convert-data'
import { IDataType } from '../types'
import { computed } from 'vue'

const props = defineProps<{
  mapData: IDataType[]
}>()

const options: any = computed(() => {
  return {
    backgroundColor: 'transparent',
    title: {
      text: '全国销量统计',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    // 在点上时展示的信息
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    visualMap: {
      show: true,
      min: 0,
      max: 80000,
      left: '10%',
      top: 'bottom',
      calculable: true,
      text: ['High', 'Low'],
      // seriesIndex: [1],
      inRange: {
        color: ['#046fb8', '#0dbc79'] // 蓝绿
      }
    },
    geo: {
      show: true,
      map: 'china',
      roam: 'scale',
      emphasis: {
        label: {
          show: false
        },
        // 鼠标移动到板块时显示
        areaColor: 'red',
        itemStyle: {
          // areaColor: '#f4cccc',
          areaColor: '#757982',
          // 板块边界的颜色
          borderColor: '#fc8452'
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            // 选中时的颜色
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  }
})
</script>

<style scoped></style>
