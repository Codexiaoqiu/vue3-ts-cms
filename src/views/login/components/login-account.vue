<template>
  <div class="login_account">
    <el-form
      status-icon
      label-width="60px"
      class="demo-ruleForm"
      :model="account"
      :rules="account_rules"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { account_rules } from '../config/rules'
import LocalCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  // props: {
  //   isKeepPassWord: {
  //     type: Boolean,
  //     require: true
  //   }
  // },
  setup() {
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })
    const store = useStore()
    const formRef = ref<InstanceType<typeof ElForm>>()
    const login_action = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }

          // 2. 进行登录验证
          store.dispatch('loginModule/accountLoginAction', { ...account })
        }
      })
    }
    return { account, account_rules, login_action, formRef }
  }
})
</script>

<style scoped></style>
