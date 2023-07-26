<template>
  <div class="user">
    <div class="search">
      <HySearch
        :searchFormConfig="searchFormConfig"
        @refresh-btn-click="handleRefreshClick"
        @query-btn-click="handleQueryClick"
      />
    </div>
    <div class="content">
      <pageContent
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @new-btn-click="handleNewDate"
        @edit-btn-click="handleEditDate"
      >
        <template #status="scope">
          <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button>
        </template></pageContent
      >
      <div class="page_model">
        <pageModel
          :modelConfig="modelConfigRef"
          ref="pageModelRef"
          pageName="users"
          :defaultInfo="defaultInfo"
        ></pageModel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import HySearch from '@/components/page-search/index'
import pageContent from '@/components/page-content/index'
import pageModel from '@/components/page-model/index'

import { searchFormConfig } from '@/views/main/system/user/config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'
export default defineComponent({
  components: { HySearch, pageContent, pageModel },
  name: 'SystemUser',
  setup() {
    const { pageContentRef, handleRefreshClick, handleQueryClick } =
      usePageSearch()
    // 处理在添加和编辑是否显示密码
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    // 添加响应式数据 当选项数据改变时刷新
    const store = useStore()

    const modelConfigRef = computed(() => {
      // 动态添加部门和角色列表

      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      if (departmentItem?.options) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      if (roleItem?.options) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      return modelConfig
    })

    // 调用hook获取公共变量和函数
    const { pageModelRef, defaultInfo, handleNewDate, handleEditDate } =
      usePageModel(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      handleRefreshClick,
      handleQueryClick,
      pageContentRef,
      handleEditDate,
      handleNewDate,
      pageModelRef,
      defaultInfo,
      modelConfigRef
    }
  }
})
</script>

<style scoped lang="less"></style>
