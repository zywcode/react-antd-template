import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import './index.scss';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function MainLayout(props: any) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (value: boolean) => {
    setCollapsed(value);
  };

  return (
    <Layout className='main-layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            <Link to='/home'>主页</Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<UserOutlined />} title='功能'>
            <Menu.Item key='3'>
              <Link to='/page1'>Page1</Link>
            </Menu.Item>
            <Menu.Item key='4'>
              <Link to='/page2'>Page2</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
