import React from 'react'
import { Card, Form, Input, Checkbox, Button, Modal, message } from 'antd'
import { useState } from 'react'
import { useStore } from '../../store'
import { observer } from 'mobx-react-lite'
import { useForm } from 'antd/lib/form/Form'
import { useNavigate } from 'react-router-dom'
import "./index.scss"
const LoginForm = () => {

  //const [open, setOpen] = useState(true)
  const { loginModalStore } = useStore()
  const open = loginModalStore.open
  const setOpen = loginModalStore.setOpen

  const [form] = useForm()
  const navigate = useNavigate()


  const { loginStore } = useStore()
  const token = loginStore.token
  const getToken = loginStore.getToken


  const onLogin = () => {
    const formValues = form.getFieldsValue()
    getToken(formValues, navigate, message)
  }



  return (
    <Modal
      className="login"
      title={'加入这个小社区'}
      centered
      open={open}
      onOk={onLogin}
      onCancel={() => setOpen(false)}
      width={600}
    >

      {/* <img className="login-logo" src={logo} alt=""></img> */}
      <Form
        className="login-form"
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 12,
        }}
        style={{
          maxWidth: 700,

        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        form={form}
      >
        <div className='loginDecorations'></div>
        <Form.Item

          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input className='inputBox' />
        </Form.Item>

        <Form.Item

          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password className='inputBox' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default observer(LoginForm)