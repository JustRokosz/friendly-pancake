'use client'

import React, { useState, useEffect } from 'react'
import {
  UserOutlined,
  DotChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import logo from '@/app/logo.svg'

import { Layout, Menu, theme } from 'antd'
import { redirect, usePathname } from 'next/navigation'
import { clearToken, getToken } from '@/utils/userStorage'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from 'antd/es/layout/layout'

const { Content, Sider } = Layout

export default function Template({ children }: { children: React.ReactNode }) {
  const currentRoute = usePathname()
  const [token, setToken] = useState(null as null | string)
  const [collapsed, setCollapsed] = useState(false)
  const userToken = getToken()

  const onLogout = () => {
    clearToken()
    setToken(null)
    redirect('/login')
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    setToken(userToken)
  }, [])

  useEffect(() => {
    const newToken = getToken()
    if (!newToken && currentRoute !== '/login') {
      redirect('/login')
    }

    if (newToken && currentRoute === '/login') {
      redirect('/users-list')
    }
  }, [token])

  useEffect(() => {
    const eventListener = () => {
      setToken(getToken())
    }

    window.addEventListener('userTokenUpdate', eventListener)

    return () => window.removeEventListener('userTokenUpdate', eventListener)
  }, [])

  const menuItems = [
    {
      icon: (<UserOutlined />),
      label: (
        <Link href={'users-list'}>Users</Link>
      ),
      key: '/users-list',
    },
    {
      icon: (<DotChartOutlined />),
      label: (
        <Link href={'acquisitions'}>Acquisitions</Link>
      ),
      key: '/acquisitions'
    },
    {
      icon: (<LogoutOutlined />),
      label: 'End session',
      key: '/log-out',
      danger: true,
      onClick: onLogout
    },
  ]

  const SideBarMenu = (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="md"
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Image
          src={logo}
          priority
          alt=""
          style={{ maxWidth: '70%', height: 'auto', margin: '20px auto 0' }}
        />
      </div>
      <Menu
        items={menuItems}
        defaultSelectedKeys={[currentRoute]}
        theme="dark"
        mode="inline"
        style={{ marginTop: '20px' }}
      />
    </Sider>
  )

  const LogoHeader = (
    <Header style={{ height: 'auto', textAlign: 'center' }}>
      <Image
        src={logo}
        priority
        alt=""
        style={{ maxWidth: '70%', height: 'auto', margin: '20px auto 0' }}
      />
    </Header>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {token ? SideBarMenu : LogoHeader}
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
