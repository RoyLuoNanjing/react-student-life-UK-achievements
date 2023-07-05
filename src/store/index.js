import React from 'react'
import { AchievementStore } from './achievements.Store'
import { LoginModalStore } from './loginModal.Store'
import { LoginStore } from './login.Store'
import { UserInfoStore } from './userInfo.Store'

class RootStore {
  constructor() {
    this.achievementStore = new AchievementStore()
    this.loginModalStore = new LoginModalStore()
    this.loginStore = new LoginStore()
    this.userInfoStore = new UserInfoStore()
  }
}


const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)
export { useStore }