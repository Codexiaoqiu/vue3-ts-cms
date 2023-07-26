<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './components/login-panel.vue'
export default defineComponent({
  name: 'LoginView',
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* 设置背景图 */
  background-image: url('../../assets/image/大眼.png');

  /* 设置背景图尺寸为铺满整个页面 */
  background-size: cover;

  /* 设置背景图重复方式 */
  background-repeat: no-repeat;

  /* 设置背景图位置 */
  background-position: center;

  /* 设置背景图固定 */
  background-attachment: fixed;
}
</style>
