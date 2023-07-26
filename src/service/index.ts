// service统一出口
import HYRequest from './request'
import { TIME_OUT, BASE_URL } from './request/config'
import LocalCache from '../utils/cache'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      console.log(token)
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      console.log(err)
      return err
    }
  }
})
// console.log(hyRequest)
export default hyRequest
