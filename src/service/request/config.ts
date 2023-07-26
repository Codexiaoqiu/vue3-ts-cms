// 方式一 ： 手动的切换不同的环境
// 配置不同的（开发 上线 测试）版本

// 方式二 ： 根据process.env.NODE_ENV
// 开发环境：development
// 生产环境：production
// 测试环境：test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://121.37.196.89:8880'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://codewhy.org/pro'
} else {
  BASE_URL = 'http://codewhy.org/test'
}

export { TIME_OUT, BASE_URL }
