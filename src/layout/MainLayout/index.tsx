import React, {useEffect, useState} from 'react';
import { Layout, Menu, Space } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  FileExcelOutlined,
  SmileOutlined,
  HeartOutlined
} from '@ant-design/icons';
import type {MenuDataItem} from '@ant-design/pro-layout';
import ProLayout, {PageContainer} from '@ant-design/pro-layout';
import HeaderDropdown from "@/component/HeaderDropdown";
import './index.scss';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const IconMap: any = {
  smile: <SmileOutlined/>,
  excel: <FileExcelOutlined/>,
};

const defaultMenus = [
  {
    path: '/home',
    name: 'Home',
    icon: 'smile',
  },
  {
    path: '/page1',
    name: 'Page1',
    icon: 'smile',
  },
  {
    path: '/page2',
    name: 'Page2',
    icon: 'smile',
  },
];

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
  return menus.map(({icon, routes, ...item}) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));
}
export default function MainLayout(props: any) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch({type: 'user/getUserInfo'});
  }, []);

  const handleCollapse = (value: boolean) => {
    setCollapsed(value);
  };

  return (
    <ProLayout
      style={{
        minHeight: '100vh',
      }}
      fixSiderbar
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }
        return defaultDom;
      }}
      menu={{request: async () => loopMenuItem(defaultMenus)}}
      rightContentRender={() => (
        <Space size={16}>
          <HeaderDropdown></HeaderDropdown>
        </Space>
      )}
    >
      {/*<PageContainer>*/}
      <div>
        <Outlet />
      </div>
      {/*</PageContainer>*/}
    </ProLayout>
  );
}
