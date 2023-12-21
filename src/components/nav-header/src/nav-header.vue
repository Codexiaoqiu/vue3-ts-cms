<template>
  <div class="nav_header_page">
    <div class="nav_header">
      <el-icon class="fold_menu" @click="handleFoldClick" v-show="!isFold"
        ><Fold
      /></el-icon>
      <el-icon class="fold_menu" @click="handleFoldClick" v-show="isFold"
        ><Expand
      /></el-icon>
    </div>
    <div class="content">
      <div>
        <HyBreadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div class="user_info">
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import HyBreadcrumb from '@/base-ui/form/breadcrumb/index'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    UserInfo,
    HyBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
      console.log(route.meta)
    }

    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return { isFold, handleFoldClick, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.nav_header_page {
  display: flex;
  // align-items: center;
  width: 100%;
  .nav_header {
    .fold_menu {
      // padding-top: 4px;
      font-size: 30px;
      cursor: pointer;
    }
  }
  .content {
    flex: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
