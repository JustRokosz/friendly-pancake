'use client'

import React, { Suspense, useState } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import { useAuth } from '@/services/authenticate'
import { redirect } from 'next/navigation'

type UserFieldType = {
  user_id: string
  password: string
}

const LoginPage: React.FC = () => {
  const auth = useAuth()
  const [formError, setFormError] = useState('')


  const onFinish = (values: UserFieldType) => {
    const { user_id, password } = values;
    try {
      const res = auth.onLoginCall({ user_id, password })
      res.then(data => {
        if(data) {
          redirect('/users-list')
        } else {
          setFormError('Ups! Error encountered. Please check provided credentials or try again later.')
        }
      })

    } catch(e) {
      setFormError('Ups! Error encountered. Please check provided credentials or try again later.')
    }
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: '0 auto' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        data-cy='login-form'
      >
        {formError && (
          <Alert
            message="Error"
            description={formError}
            type="error"
            showIcon
            style={{ marginBottom: 20 }}
            closable
            data-cy='login-error'
          />
        )}
        <Form.Item<UserFieldType>
          label="Username"
          name="user_id"
          rules={[{ required: true, message: 'Please input your username' }]}
          data-cy='login-id-input'
        >
          <Input />
        </Form.Item>

        <Form.Item<UserFieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password' }]}
          data-cy='login-password-input'
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" data-cy='login-submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginPage