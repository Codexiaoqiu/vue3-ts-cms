<template>
  <div>
    <baseEchart :options="options"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/base-ui/echart'

// import { EChartsOption } from 'echarts'
// import type { PieSeriesOption } from 'echarts'
// import type { IDataType } from '../types/index'
import { computed } from 'vue'

const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()
const options: any = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
