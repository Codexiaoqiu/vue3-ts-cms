<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="category">
    <pageContent
      pageName="category"
      :contentTableConfig="contentTableConfig"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'ProductCategory',
  components: {
    pageContent
  },

  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
