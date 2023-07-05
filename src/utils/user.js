//封装ls存取token
const key = 'pc-user'

const setUser = (username) => {
  return window.localStorage.setItem(key, username)
}

const getUser = () => {
  return window.localStorage.getItem(key)
}

const removeUser = () => {
  return window.localStorage.removeItem(key)
}

export {
  setUser,
  getUser,
  removeUser,
}