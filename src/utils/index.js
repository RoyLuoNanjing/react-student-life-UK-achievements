//先把所有的工具函数导出的模块在这里导入
//然后再统一导出
import { http } from './http'
import { setAccessToken, getAccessToken, removeAccessToken } from './token'
import { setIdToken, getIdToken, removeIdToken } from './token'
import { setUser, getUser, removeUser } from './user'
export {
  http,
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setIdToken,
  getIdToken,
  removeIdToken,
  setUser, getUser, removeUser
}