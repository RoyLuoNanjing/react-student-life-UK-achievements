import React from 'react'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Layout from '../../components/Layout/Layout'
import TableBox from '../../components/TableBox/TableBox'
import { observer } from 'mobx-react-lite'
import Video from '../../assets/videos/ocean.mp4'
const Main = () => {
  const onClick = () => {
    const screenHeight = window.innerHeight
    const scrollPosition = screenHeight

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
  }
  return (
    <>
      <Layout>
        <Hero Video={Video} Title={`Ever-shifting, transient world`} Paragrah={'观天下事如浩渺，思万物情有无常'} ButtonInput={'Start'} OnClick={onClick}></Hero>
      </Layout>
      <TableBox></TableBox>
    </>

  )
}

export default observer(Main)