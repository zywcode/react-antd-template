import {LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox} from '@ant-design/pro-form';
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {message, Tabs, Space} from 'antd';
import type {CSSProperties} from 'react';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useStore, useSelector, useDispatch } from "react-redux";

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

export default (props: any) => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const store = useStore();
  const selector = useSelector(state => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  console.log("store:", store.getState());
  console.log("selector:", selector);
  console.log("what props:", props);
  useEffect(() => {
    console.log('effect selector');
    console.log(selector);
    setUsername(selector && selector.userinfo && selector.userinfo.username);
  }, [JSON.stringify(selector)]);

  useEffect(() => {
    console.log('effect name', username);
  }, [username]);
  const handleSubmit = async (value: any) => {
    console.log(value)
    dispatch({type: 'app/getUserinfo', payload: {id: '1', username: value.username}});
    navigate('/home');
  }
  return (
    <div style={{backgroundColor: 'white'}}>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大同性交友网站"
        onFinish={handleSubmit}
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined style={iconStyles}/>
            <TaobaoCircleOutlined style={iconStyles}/>
            <WeiboCircleOutlined style={iconStyles}/>
          </Space>
        }
      >
        <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
          <Tabs.TabPane key={'phone'} tab={'手机号登录'}/>
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'}/>,
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'}/>,
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'}/>,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'}/>,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  );
};
