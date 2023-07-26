<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="login-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <LoginPhone ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="login_config">
      <el-checkbox class="remember_password" v-model="isKeepPassword"
        >记住密码</el-checkbox
      >
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login_btn_row">
      <el-button type="primary" class="login_btn" @click="handle_login_click"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')
    const handle_login_click = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.login_action(isKeepPassword.value)
      } else {
        phoneRef.value?.login_action()
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handle_login_click
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  .title {
    text-align: center;
    color: #fff;
  }
  .login_config {
    display: flex;
    justify-content: space-between;
    .remember_password {
      color: #fff;
    }
  }

  .login_btn_row {
    display: flex;
    justify-content: center;
    .login_btn {
      width: 100%;
    }
  }
}
</style>
