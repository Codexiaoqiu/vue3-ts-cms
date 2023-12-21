<template>
  <div class="nav_menu">
    <div class="logo">
      <img src="~@/assets/logo.png" alt="logo" class="img" />
      <span class="title" v-if="!isCollapse">Vue3+TS</span>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultValue"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#fff"
      >
        <template v-for="item in userMenus" :key="item.id">
          <template v-if="item.type === 1">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon><House /></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <!-- <el-menu-item-group> -->
              <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item
                  :index="subitem.id + ''"
                  @click="handleMenuItemClick(subitem)"
                >
                  <el-icon><House /></el-icon>
                  {{ subitem.name }}</el-menu-item
                >
              </template>
              <!-- </el-menu-item-group> -->
            </el-sub-menu>
          </template>
          <template v-if="item.type === 2">
            <el-menu-item>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  props: ['isCollapse'],
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.loginModule.userMenus)
    const route = useRoute()
    const currentPath = route.path
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    const router = useRouter()
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { userMenus, handleMenuItemClick, defaultValue }
  }
})
</script>

<style scoped lang="less">
.nav_menu {
  height: 100%;
  // width: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    // align-content: center;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      // line-height: 16px;
      padding-left: 5px;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
  }
}
.el-menu {
  border-right: none;
}
.el-sub-menu {
  background-color: #001529 !important;
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}
::v-deep .el-sub-menu__title {
  // align-items: center;
  // height: px;
  line-height: normal;
  background-color: #001529 !important;
}

.el-menu-item:hover {
  color: #fff !important;
}

.el-menu-item.is-active {
  background-color: #0a60bd !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
