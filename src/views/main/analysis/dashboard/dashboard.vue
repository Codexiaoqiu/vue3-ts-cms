<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <chartCard title="分类商品数量（饼图）">
          <pieEchart :pie-data="categoryGoodsCount"></pieEchart>
        </chartCard>
      </el-col>
      <el-col :span="10">
        <chartCard title="不同城市商品销量">
          <mapEchart :map-data="addressGoodsSale"></mapEchart>
        </chartCard>
      </el-col>
      <el-col :span="7">
        <chartCard title="分类商品数量（玫瑰图）">
          <roseEchart :rose-data="categoryGoodsCount"></roseEchart>
        </chartCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content_row">
      <el-col :span="12">
        <chartCard title="分类商品的销量">
          <lineEchart v-bind="categoryGoodsSale"></lineEchart>
        </chartCard>
      </el-col>
      <el-col :span="12">
        <chartCard title="分类商品的收藏">
          <barEchart v-bind="categoryGoodsFavor"></barEchart>
        </chartCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useStore } from '@/store'

import chartCard from '@/base-ui/card'
import {
  pieEchart,
  roseEchart,
  lineEchart,
  barEchart,
  mapEchart
} from '@/components/page-echarts/index'

export default defineComponent({
  components: {
    chartCard,
    pieEchart,
    roseEchart,
    lineEchart,
    barEchart,
    mapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboardModule/getDashboardDataAction')
    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount
        .filter((item: any) => {
          return item.goodsCount > 0
        })
        .map((item: any) => {
          return { name: item.name, value: item.goodsCount }
        })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale
      categoryGoodsSale
        .filter((item: any) => {
          return item.goodsSale > 0
        })
        .forEach((item: any) => {
          xLabels.push(item.name)
          values.push(item.goodsSale)
        })

      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboardModule.categoryGoodsFavor
      categoryGoodsFavor
        .filter((item: any) => {
          return item.goodsFavor > 0
        })
        .forEach((item: any) => {
          xLabels.push(item.name)
          values.push(item.goodsFavor)
        })

      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale
        .filter((item: any) => {
          return item.count > 0
        })
        .map((item: any) => {
          return { name: item.address, value: Number(item.count) }
        })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content_row {
  margin-top: 20px;
}
</style>
