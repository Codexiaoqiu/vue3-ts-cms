import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import { AxiosRequestConfig } from 'axios'

// 添加拦截器的属性定义
export interface HYRequestInterceptors<T = AxiosResponse> {
  // requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 自定义AxiosRequestConfig-->添加拦截器
export interface HYRequestConfig<T = AxiosResponse>
  extends InternalAxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
