<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="goods">
    <pageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :preview-src-list="[scope.row.imgUrl]"
          :preview-teleported="true"
          :initial-index="0"
          fit="cover"
        />
      </template>
      <template #status="scope">
        <el-button :type="scope.row.status ? 'success' : 'danger'" plain>{{
          scope.row.status ? '已上架' : '已下架'
        }}</el-button>
      </template>
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'ProductGoods',
  components: {
    pageContent
  },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
