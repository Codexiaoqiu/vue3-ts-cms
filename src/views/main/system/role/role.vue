<template>
  <div class="role">
    <HySearch :searchFormConfig="searchFormConfig"></HySearch>
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @new-btn-click="handleNewDate"
      @edit-btn-click="handleEditDate"
    ></pageContent>
    <pageModel
      :modelConfig="modelConfig"
      ref="pageModelRef"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu_tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </pageModel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useStore } from '@/store'
import HySearch from '@/components/page-search/index'
import pageContent from '@/components/page-content'
import pageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modelConfig } from './config/model.config'

import { usePageModel } from '@/hooks/usePageModel'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'SystemRole',
  components: {
    HySearch,
    pageContent,
    pageModel
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, true)
      })
    }
    // 调用hook获取公共变量和函数
    const { pageModelRef, defaultInfo, handleNewDate, handleEditDate } =
      usePageModel(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modelConfig,
      pageModelRef,
      defaultInfo,
      handleNewDate,
      handleEditDate,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu_tree {
  margin-left: 30px;
}
</style>
