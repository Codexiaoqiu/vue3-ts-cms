import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: EChartsOption) => {
    echartInstance.setOption(options)
  }

  const setResize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    setResize
  }
}
