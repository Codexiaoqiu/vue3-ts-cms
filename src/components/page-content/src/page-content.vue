<template>
  <div class="pageContent">
    <HyTable
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- header 中的插槽 -->
      <template #headerHandler>
        <el-button
          :icon="Plus"
          type="primary"
          v-if="isCreate"
          @click="handleNewClick"
          >新建用户</el-button
        >
        <el-button :icon="Refresh" type="info"></el-button>
      </template>
      <!-- conten 中的插槽 -->

      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handle="scope">
        <div class="handle-btns">
          <el-button
            :icon="Edit"
            type="primary"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            :icon="Delete"
            type="danger"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在pageContent中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </HyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { Delete, Edit, Plus, Refresh } from '@element-plus/icons-vue'
import { useStore } from '@/store'
import HyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermission'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  components: { HyTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取按钮权限
    const route = useRoute()
    const path = route.path
    let perPath = ''
    if (path.includes('system')) {
      perPath = 'system'
    } else if (path.includes('product')) {
      perPath = 'product'
    }
    const isCreate = usePermission(perPath, props.pageName, 'create')
    const isUpdate = usePermission(perPath, props.pageName, 'update')
    const isDelete = usePermission(perPath, props.pageName, 'delete')
    // 查询权限
    const isQuery = usePermission(perPath, props.pageName, 'query')

    // 双向绑定page-info
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 监听pageInfo的改变
    watch(pageInfo, () => getPageData())
    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`systemModule/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`systemModule/pageListCount`](props.pageName)
    )

    // 获取其他的动态插槽
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        // if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handle') return false
        return true
      }
    )
    // 删除操作
    const handleDeleteClick = (row: any) => {
      ElMessageBox.confirm('是否删除该信息?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store.dispatch('systemModule/deletePageDataAction', {
            pageName: props.pageName,
            id: row.id
          })
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '删除失败'
          })
        })
    }
    // 新建用户按钮
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // 编辑信息
    const handleEditClick = (row: any) => {
      emit('editBtnClick', row)
    }
    return {
      Delete,
      Edit,
      Plus,
      Refresh,
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.pageContent {
  margin-top: 30px;
  padding: 22px;
  border-top: 30px solid #f0f2f5;
}
</style>
