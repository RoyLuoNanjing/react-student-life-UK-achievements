//封装ls存取token
const key = 'Access-token'
const key2 = 'ID-token'
const setAccessToken = (token) => {
  return window.localStorage.setItem(key, token)
}

const getAccessToken = () => {
  return window.localStorage.getItem(key)
}

const removeAccessToken = () => {
  return window.localStorage.removeItem(key)
}

const setIdToken = (token) => {
  return window.localStorage.setItem(key2, token)
}

const getIdToken = () => {
  return window.localStorage.getItem(key2)
}

const removeIdToken = () => {
  return window.localStorage.removeItem(key)
}



export {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  setIdToken,
  getIdToken,
  removeIdToken
}