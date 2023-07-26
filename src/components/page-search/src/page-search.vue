<template>
  <div class="search">
    <HyForm v-bind="searchFormConfig" v-model:modelValue="formData">
      <template #header>
        <h1>shuai</h1>
      </template>
      <template #footer>
        <div class="foot_btn_row">
          <el-button :icon="Refresh" @click="handleRefreshClick"
            >刷新</el-button
          >
          <el-button type="primary" :icon="Search" @click="handleQueryClick"
            >搜素</el-button
          >
        </div>
      </template>
    </HyForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import HyForm from '@/base-ui/form/index'

import { Search, Refresh } from '@element-plus/icons-vue'
import { IForm } from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ['refreshBtnClick', 'queryBtnClick'],
  components: {
    HyForm
  },
  setup(props, { emit }) {
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const handleRefreshClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
        emit('refreshBtnClick')
      }
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return { Search, Refresh, formData, handleRefreshClick, handleQueryClick }
  }
})
</script>

<style scoped lang="less">
.search {
  padding: 22px;
  // margin-bottom: 30px;
  .foot_btn_row {
    text-align: right;
  }
}
</style>
