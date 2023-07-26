// 自定义表单验证规则
export const account_rules = {
  name: [
    {
      required: true,
      message: '请输入账号名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名由5-10个字母或数字组成',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '密码由5-10个字母或数字组成',
      trigger: 'blur'
    }
  ]
}

// 自定义表单验证规则
export const phone_rules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11}$/,
      message: '手机号由11位数字组成',
      trigger: 'blur'
    }
  ]
  // password: [
  //   {
  //     required: true,
  //     message: '请输入密码',
  //     trigger: 'blur'
  //   },
  //   {
  //     pattern: /^[a-zA-Z0-9]{5,10}$/,
  //     message: '密码由5-10个字母或数字组成',
  //     trigger: 'blur'
  //   }
  // ]
}
