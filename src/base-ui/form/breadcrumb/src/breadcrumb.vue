<template>
  <div class="nav_readcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item of breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  name: 'BreadCrumb',
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
