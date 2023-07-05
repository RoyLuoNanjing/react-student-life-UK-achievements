import React from 'react'
import Hero from '../../components/Hero/Hero'
import Forest from '../../assets/videos/forest.mp4'
import Header from '../../components/Header/Header'
import LoginForm from '../../components/LoginForm/LoginForm'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'

const Login = () => {
  const { loginModalStore } = useStore()
  const setOpen = loginModalStore.setOpen


  return (
    <>
      <Hero Video={Forest} Title={'在他乡留下你的脚印'} ButtonInput={'Join Us'} OnClick={setOpen}></Hero>
      <LoginForm></LoginForm>
    </>
  )
}

export default observer(Login)