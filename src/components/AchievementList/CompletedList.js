import React from 'react'
import { Avatar, List, Space, Card, Image, Table } from 'antd'
import { TeamOutlined, SkinOutlined, FrownOutlined, SmileOutlined, BulbOutlined, StarFilled } from '@ant-design/icons'
import { ListData } from '../../data/ListData'
import "./index.scss"
import useContentful from '../../hooks/useContentful'
import { useEffect, useState } from 'react'


import { useStore } from '../../store'


import { observer } from 'mobx-react-lite'
import { http } from '../../utils'



const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)


const CompletedList = () => {

  //use Store
  const { achievementStore } = useStore()
  const completedAchievements = achievementStore.completedAchievements
  const setCompletedAchievements = achievementStore.setCompletedAchievements
  const getCompletedAchievements = achievementStore.getCompletedAchievements


  const { userInfoStore } = useStore()
  const getUserInfo = userInfoStore.getUserInfo
  const userInfo = userInfoStore.userInfo

  //先获取userinfo
  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  //再根据userInfo来刷新页面
  useEffect(() => {
    getCompletedAchievements(userInfo)
  }, [getCompletedAchievements, userInfo])

  const [showContent, setShowContent] = useState({})
  const [hoveredItem, setHoveredItem] = useState(null)
  const handleMouseOver = (itemId) => {
    setShowContent((prevState) => ({
      ...prevState,
      [itemId]: true,
    }))
    setHoveredItem(itemId)
  }

  const handleMouseOut = (itemId) => {
    setShowContent((prevState) => ({
      ...prevState,
      [itemId]: false,
    }))
    setHoveredItem(null)
  }


  return (

    <List
      grid={{
        gutter: 0,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 16,
      }}
      dataSource={completedAchievements.list}
      footer={<></>
      }
      renderItem={(item) => (
        <List.Item style={{}}>
          <Card
            hoverable
            style={{ width: 220, position: hoveredItem === item.id ? 'absolute' : 'static', zIndex: hoveredItem === item.id ? 9999 : 'auto' }}
            cover={<img alt="Product name: {item.name}" src={item.cover.fields.file.url} />}
            onMouseOver={() => { handleMouseOver(item.id) }}
            onMouseOut={() => handleMouseOut(item.id)}
          >
            <Card.Meta title={item.title} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
              {[...Array(item.rarity)].map((_, index) => (
                <span key={index} ><StarFilled style={{ color: 'gold' }} /></span>
              ))}
            </div>
            <div
            >
              {/* 鼠标经过展开，鼠标离开收回的效果 */}
              {showContent[item.id] && item.description.content[0].content[0].value}
            </div>
            {showContent[item.id] && <div >
              <h1> 达成条件:</h1>
              {item.content.map((item, index) => {
                return <p key={index}>{'· ' + item}</p>
              })}
            </div>}
            {showContent[item.id] && <div >
              <h1> 达成日期:</h1>
              <p>{userInfo.achievements[item.id]}</p>
            </div>}

          </Card>
        </List.Item >
      )}
    />
  )
}
export default observer(CompletedList)