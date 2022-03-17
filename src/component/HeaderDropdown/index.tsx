import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {Avatar, Dropdown, Menu, Spin} from 'antd';
import {useNavigate} from "react-router-dom";
import './index.scss';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const HeaderDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const navigate = useNavigate();

  menu = true;

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      navigate('/login');
    }
  }
  const menuHeaderDropdown = (
    <Menu className="header-dropdown-overlay" selectedKeys={[]} onClick={handleMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menuHeaderDropdown}>
      <span className="header-dropdown">
        <Avatar size="small" alt="avatar" src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}/>
        <span className="username">{'Admin'}</span>
      </span>
    </Dropdown>
  );
};

export default HeaderDropdown;
