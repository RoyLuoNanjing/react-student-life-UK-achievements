import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaBars } from 'react-icons/fa'
import { useStore } from '../../store'
import { observer } from 'mobx-react-lite'
import { Button, Popconfirm } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { http } from "../../utils"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false) // 跟踪是否显示纵向导航栏
  const { loginStore } = useStore()

  //从login store中拿到当前情况下的用户名
  const username = loginStore.username
  const token = loginStore.username
  const toggleMenu = () => {
    setShowMenu(!showMenu) // 切换纵向导航栏的显示状态
  }

  const navigate = useNavigate()
  //退出登录
  const onConfirm = () => {
    loginStore.loginOut()
    navigate('/login')
  }


  return (
    <Nav>
      <NavLink to="/">探索异乡生活 Explore a new world </NavLink>
      <Bars onClick={toggleMenu} />
      <NavMenu showMenu={showMenu}>
        <NavLink key={username} >
          {username}
        </NavLink>
        <Button>
          <Popconfirm
            onConfirm={onConfirm}
            title="是否确认退出？Confirm?" okText="退出Quit" cancelText="取消Cancel">
            <LogoutOutlined /> 退出Logout
          </Popconfirm>
        </Button>
      </NavMenu>
      {/* <NavBtn>
        <Button primary="true" round="true" to="/trips">Book a Flight</Button>
      </NavBtn> */}

    </Nav>
  )
}



export default observer(Header)


const Nav = styled.nav`
  background : transparent !important;
  height : 80px;
  display : flex;
  justify-content : space-between;
  padding : 0rem calc((100vw - 1300px)/2);
  z-index : 100;
  position: relative;
`

const NavLink = styled(Link)`
  color : #fff;
  display : flex;
  font-size: 1.8rem;
  align-items : center;
  text-decoration : none;
  padding : 0rem;
  height : 100%;
  cursor : pointer;
  margin-right: 1rem;
`

const Bars = styled(FaBars)`
  display: none;
  color : #fff;

  @media screen and (max-width: 768px){
    display : block;
    position : absolute;
    top: 0 ;
    right : 0;
    transform : translate(-100% , 75%);
    font-size: 1.8rem;
    cursor : pointer;
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0px;
  color: #fff;

//   @media screen and (max-width: 768px) {
//     display: ${(props) => (props.showMenu ? 'flex' : 'none')};
//     flex-direction: column;
//     position: absolute;
//     top: 80px;
//     left: 0;
//     width: 100%;
//     background-size: cover;
//     background-repeat: no-repeat;
//     background-position: center;
//     padding: 2rem 1rem;
//   }
// `

// const NavBtn = styled.div`
//   display:flex;
//   align-items: center;
//   margin-right:24px;

//   @media screen and (max-width: 768px){
//     display:none;
//   }
// `