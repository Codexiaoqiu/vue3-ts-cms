<template>
  <div class="login_phone">
    <el-form
      status-icon
      label-width="80px"
      :rules="phone_rules"
      class="demo-ruleForm"
      :model="account"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div class="password_row">
          <el-input
            type="password"
            autocomplete="off"
            v-model="account.password"
          />
          <el-button type="primary" class="get_password">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { phone_rules } from '../config/rules'
export default defineComponent({
  setup() {
    const account = reactive({
      phone: '',
      password: ''
    })
    const login_action = () => {
      console.log('---')
    }
    return { account, phone_rules, login_action }
  }
})
</script>

<style scoped lang="less">
.password_row {
  display: flex;
  .get_password {
    margin-left: 8px;
  }
}
</style>
