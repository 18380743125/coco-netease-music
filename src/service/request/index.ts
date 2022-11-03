import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { BRequestConfig } from './type'

class BRequest {
  instance: AxiosInstance
  constructor(config: BRequestConfig) {
    this.instance = axios.create(config)
    // 给每个实例添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('全局请求失败的拦截')
        Promise.reject(err)
      }
    )
    // 给每个实例添加响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        Promise.reject(err)
      }
    )

    // 针对特定的实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailFn
    )
  }

  request<T = any>(config: BRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve) => {
      this.instance.request<any, T>(config).then((res) => {
        // 单次请求成功的拦截器
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors?.responseSuccessFn(res)
        }
        resolve(res)
      })
    }).catch((err) => Promise.reject(err))
  }

  get<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: AxiosRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default BRequest
