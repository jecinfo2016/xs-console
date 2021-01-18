import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000
})

service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.resp_code !== 0) {
      Message({
        message: res.resp_msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.resp_msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = process.env.VUE_APP_HOME_URL
          store.dispatch('user/resetToken')
          Message({
            message: '登录过期，请重新登录',
            type: 'error',
            duration: 5 * 1000
          })
          break
      }
    }
    // Message({
    //   message: error.resp_msg,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
