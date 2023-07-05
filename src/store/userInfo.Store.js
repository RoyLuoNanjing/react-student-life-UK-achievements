import { makeAutoObservable } from 'mobx'
import { http } from '../utils'


class UserInfoStore {
  //一定要设置默认图片
  userInfo = {
    attributes: {},
    photo: 'manchester.jpg',
    degrees: [],
    name: '',
    username: '',
    gender: ''
  };

  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async () => {
    try {
      const res = await http.post('/userauth')
      this.userInfo = res
    } catch (error) {
      console.log(error)
    }
  }
}



export { UserInfoStore }