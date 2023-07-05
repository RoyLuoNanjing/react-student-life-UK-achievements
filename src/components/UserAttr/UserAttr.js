import React, { useEffect } from 'react'
import { Avatar, List, Col, Card, Row, Image } from 'antd'
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import { AttrData } from '../../data/AttrData'
import styled from 'styled-components'
import { UserData } from '../../data/UserData'
import "./index.scss"
import { useStore } from '../../store'
import { observer } from 'mobx-react-lite'
import UserRadar from './UserRadar'
import "./index.scss"


const UserAttr = () => {
  const { userInfoStore } = useStore()
  const userInfo = userInfoStore.userInfo

  useEffect(() => { userInfoStore.getUserInfo() },
    [userInfoStore])

  const userAttr = new Map(Object.entries(userInfo.attributes))

  const { Meta } = Card

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>


      {/* <Card style={{
        //   backgroundImage: `url(${require('../../assets/images/uom.jpg')})`, backgroundSize: 'cover'
        // }}>
        //   <Image style={{ width: '150px', borderRadius: '30%' }} src={require('../../assets/images/' + userInfo.photo)} />
        //   <StudentBox >


        //     <h1>{userInfo.name}</h1>
        //     <h1>{userInfo.gender}</h1>
        //     {userInfo.degrees.map((degree, index) => (
        //       <p key={index}>{degree}</p>
        //     ))}

        //   </StudentBox>
        // </Card> */}

      <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="example"
            src={require('../../assets/images/uom.jpg')}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >

        <Meta
          avatar={<Avatar src={require('../../assets/images/' + userInfo.photo)} size='large' />}
          title={userInfo.name}

          description="student"
        />
        {
          userInfo.degrees.map((degree, index) => (
            <p key={index}>{degree}</p>
          ))
        }

      </Card>

      <Card className='attrBox' >
        <span style={{ width: '100px', display: 'inline-block' }}>
          <List
            className='attrList'
            size="small"
            itemLayout="vertical"
            dataSource={userAttr}
            renderItem={(item, index) => (
              <List.Item style={{ fontSize: '20px' }}>
                <List.Item.Meta
                  avatar={<Avatar src={require(`../../assets/images/attributeLogo/${item[0]}.png`)} />}
                  title={<p>{item[0]}</p>}
                  description={item[1]}
                />
              </List.Item>
            )}
          />
        </span>
        <span style={{ width: '400px', display: 'inline-block' }}>    <UserRadar dataSource={userAttr} className='attrRadar' /></span>
        <span className='attrPattern'></span>
      </Card>




    </ div>
  )
}

export default observer(UserAttr)

const StudentBox = styled.div`
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      font-size: 15px;
      `