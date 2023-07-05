import axios from 'axios'
import { getIdToken, removeAccessToken, removeIdToken } from './token'
import { history } from './history'


const http = axios.create({
  baseURL: ' https://vdwxn9d6wj.execute-api.eu-west-2.amazonaws.com/demo',
  timeout: 30000,
  validateStatus: function (status) {
    return status >= 200 && status <= 401 // Include 401 status as an error
  },
})

// 添加请求拦截器
http.interceptors.request.use(config => {
  const token = getIdToken()
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  return response.data
  // if not login add token
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  //*此处应该用error.response.status === 401， 但不知为何拦截器没有拿到response(可能是因为Cors原因)
  if (error.code === "ERR_NETWORK") {
    console.log(error)
    //跳回登录 reactRouter默认状态下 并不支持在组件之外完成路由跳转
    //需要自己手动实现
    removeIdToken()
    removeAccessToken()
    history.push('/login')
    //window.location.reload()
    return Promise.reject(error)
  }
})
export { http }