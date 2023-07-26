<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :isCollapse="isCollapse"></NavMenu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @foldChange="handleFoldChange"></NavHeader>
        </el-header>
        <el-main class="page-content">
          <div class="page_bc">
            <router-view></router-view>
          </div>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu/index'
import NavHeader from '@/components/nav-header/index'
export default defineComponent({
  name: 'MainView',
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { isCollapse, handleFoldChange }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .main-content {
    height: 100%;
    .page {
      height: 100%;
      .page-content {
        height: calc(100% - 48px);
        .page_bc {
          background-color: #fff;
          border-radius: 5px;
        }
      }
      .el-header,
      .el-footer {
        display: flex;
        color: #333;
        text-align: center;
        align-items: center;
      }
      .el-header {
        height: 48px !important;
      }
      .el-main {
        color: #333;
        text-align: center;
        background-color: #f0f2f5;
      }
    }

    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      // line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s linear;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
