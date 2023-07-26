// import axios from 'axios'

// // 1.模拟get请求
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res)
// })

// // // 2.get请求 传递参数
// // axios
// //   .get('http://httpbin.org/get', {
// //     params: {
// //       name: 'rz',
// //       age: 18
// //     }
// //   })
// //   .then((res) => {
// //     console.log(res)
// //   })

// // // 3.post请求
// // axios
// //   .post('http://httpbin.org/post', {
// //     data: {
// //       name: 'rz',
// //       age: '18'
// //     }
// //   })
// //   .then((res) => {
// //     console.log(res)
// //   })
// // 4.axios的配置选项
// // 全局配置配置选项
// // 路由头
// axios.defaults.baseURL = 'http://httpbin.org'
// // 超时时间
// axios.defaults.timeout = 10000
// // 请求头
// // axios.defaults.headers= {}
// // 2.get请求 传递参数
// // 单独配置配置选项
// axios
//   .get('/get', {
//     params: {
//       name: 'rz',
//       age: 18
//     },
//     timeout: 5000,
//     headers: {}
//   })
//   .then((res) => {
//     console.log(res)
//   })

// // 3.post请求
// axios
//   .post('/post', {
//     data: {
//       name: 'rz',
//       age: '18'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// // axios.all() => 多个请求 一起返回
// axios
//   .all([
//     axios.get('/get', { params: { name: 'rz', age: 18 } }),
//     axios.post('/post', { data: { name: 'rz', age: 18 } })
//   ])
//   .then((res) => {
//     console.log(res)
//   })

// // 6. axios的拦截器
// // fn1请求发送成功执行的函数
// // fn2请求发送失败执行的函数
// // 拦截请求
// axios.interceptors.request.use(
//   (config) => {
//     // 做一些想做的事
//     // 1.给请求添加token
//     // 2.isloading动画
//     console.log('请求发送成功')
//     return config
//   },
//   (err) => {
//     console.log('请求发送失败')
//     return err
//   }
// )
// // 拦截响应
// // fn1：数据响应成功（服务器正常返回了数据 20x）
// axios.interceptors.response.use(
//   (res) => {
//     console.log('响应成功的拦截')
//     return res.data
//   },
//   (err) => {
//     console.log('服务器响应失败')
//     return err
//   }
// )
