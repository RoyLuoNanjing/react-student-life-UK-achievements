import React, { useState, useStore, useEffect } from 'react'
import styled from 'styled-components'
import { Layout, Menu, theme, Image } from 'antd'
import AchievementList from '../AchievementList/AchievementList'
import imageBg from '../../assets/images/library.jpg'
import UserAttr from '../UserAttr/UserAttr'
import { observer } from 'mobx-react-lite'
import CompletedList from '../AchievementList/CompletedList'

const { Content, Sider } = Layout





const items2 = [
  {
    key: `sider1`,
    //icon: React.createElement(icon),
    label: `My Profile`,
    children: [
      {
        key: 'UserAttr',
        label: `My Status`,
      },
    ]
  },
  {
    key: `sider2`,
    //icon: React.createElement(icon),
    label: `UK Events`,
    children: [
      {
        key: 'AchieventList',
        label: `Event List`,
      },
      {
        key: 'CompletedList',
        label: `Completed`,
      },
    ]
  },
]



const TableBox = () => {

  const [hiddenComponents, setHiddenComponents] = useState({
    UserAttr: false,
    AchieventList: true,
    CompletedList: false

  })

  const handleMenuClick = (event) => {
    // Handle menu item click event here
    console.log('Menu item clicked:', event.key)
    const selectMenu = event.key
    setHiddenComponents({ [selectMenu]: true })
  }


  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (

    <TableContainer>
      <Layout
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }}>
        <Content
          style={{
            padding: '20px 50px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >

          <Layout
            style={{
              padding: '24px 0',
              background: colorBgContainer,
              backgroundImage: `url(${require('../../assets/images/diaryBg.jpg')})`
            }}
          >
            <Sider
              style={{
                background: colorBgContainer,
                backgroundColor: 'rgba(0, 0, 0, 0)'
              }}
              width={200}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['AchieventList']}
                defaultOpenKeys={['sider2']}
                style={{
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0)'
                  //backgroundImage: `url(${require('../../assets/images/siderBg.jpg')})`
                }}
                items={items2}
                onClick={handleMenuClick}
              />
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
              }}
            >
              {hiddenComponents.UserAttr && <UserAttr ></UserAttr>}
              {hiddenComponents.AchieventList && <AchievementList ></AchievementList>}
              {hiddenComponents.CompletedList && <CompletedList></CompletedList>}
            </Content>
          </Layout>
        </Content>
      </Layout>

    </TableContainer>
  )
}

export default observer(TableBox)


const TableContainer = styled.div`
  min-height: 85vh;
  padding: 1rem calc((100vw - 1300px) / 2);
  color: #fff;
  background-image: url(${imageBg});;
  background-size: cover;
`




