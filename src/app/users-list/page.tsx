'use client'

import { useUser } from '@/services/user'
import { Alert, Button, Card, Form, Input, List } from 'antd'
import React, { useEffect, useState } from 'react'

type User = {
  user_id: string
  name: string
  password?: string | undefined
}

const UsersListPage: React.FC = () => {
  const [form] = Form.useForm();
  const users = useUser()
  const [usersList, setUsersList] = useState([] as Array<User>)
  const [userDetails, setUserDetails] = useState({} as User)
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)

  const updateUsersList = () => {
    const res = users.onUsersListCall()

    res.then(data => {
      if (data)
        setUsersList(data)
    })
  }

  useEffect(() => {
    updateUsersList()
  }, [])

  const onUserDetailsClick = (id: string) => {
    const res = users.onUserDetialsCall({ user_id: id })

    res.then(data => {
      setUserDetails(data)
      setEditFormVisible(false)
      setSuccessVisible(false)
      setErrorVisible(false)
    })
  }

  const onEditUserData = () => {
    setEditFormVisible(!editFormVisible)
    setErrorVisible(false)
    setSuccessVisible(false)
  }

  const onFinish = (values: User) => {
    const { password, name } = values
    const { user_id } = userDetails

    const res = users.onUserDetailsUpdateCall({ user_id, password, name })

    res.then(data => {
      if(data) {
        updateUsersList()
        setSuccessVisible(true)
        form.resetFields()
      } else {
        setErrorVisible(true)
      }
    })
  }

  const extraCardLabel = () => {
    if (!userDetails.password) {
      return (<></>)
    }

    return (
      <span
        onClick={() => onEditUserData()}
        style={{ cursor: 'pointer', color: '#1677FF' }}
        data-cy='user-detais-show-form'
      >
        Edit
      </span>
    )
  }

  return (
    <div data-cy='users-list-page'>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 3,
        }}
        dataSource={usersList}
        renderItem={(user) => (
          <List.Item>
            <Card data-cy={`user-details-card-${user.user_id}`}>
              NAME: {user.name}<br />
              ID: {user.user_id}<br />
              <Button
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => onUserDetailsClick(user.user_id)}
                data-cy='user-details-button'
              >
                Details
              </Button>
            </Card>
          </List.Item>
        )}
        data-cy='users-list-component'
      />

      {userDetails && userDetails.name && (
        <Card title="User details" extra={extraCardLabel()} data-cy='user-details-card'>
          ID: {userDetails.user_id}<br />
          NAME: {userDetails.name}<br />
          PASSWORD: {userDetails.password || '******'}

          {editFormVisible && (
            <Form
              form={form}
              name='password_update'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, margin: '20px auto 0' }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete='off'
              data-cy='user-details-editForm'
            >
              {successVisible && (
                <Alert
                  message='Details successfuly updated'
                  type='success'
                  showIcon
                  style={{ marginBottom: 20 }}
                  data-cy='user-details-update-success'
                />
              )}

              {errorVisible && (
                <Alert
                  message='Error has occured, please try again'
                  type='error'
                  showIcon
                  style={{ marginBottom: 20 }}
                  data-cy='user-details-update-error'
                />
              )}

              <Form.Item
                name="name"
                label="User name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new user name',
                  },
                ]}
                hasFeedback
                data-cy='user-update-name-input'
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password',
                  },
                ]}
                hasFeedback
                data-cy='user-update-password-input'
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match'));
                    },
                  }),
                ]}
                data-cy='user-update-password-confirm-input'
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' data-cy='user-update-submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      )}


    </div>
  )
}

export default UsersListPage