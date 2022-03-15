import axios from 'axios';
import api from '@/common/api';
import {notification} from 'antd';

// 设置基础路径
axios.defaults.baseURL = api.baseURL;

// 设置get/post请求参数类型
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use((config: any) => {
  console.log(config);
  // 让每个请求携带自定义 token
  const token = localStorage.getItem('token');
  config.headers['Authorization'] = token ? `Bearer ${token}` : '';
  return config
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

// 响应拦截器
axios.interceptors.response.use((response) => {
  const status = response.status
  let msg = ''
  let data = response.data;
  if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码
    msg = showStatus(status)
    if (typeof data === 'string') {
      response.data = {msg}
    } else {
      data.msg = msg
    }
    //拦截异常（通知）
    notification.open({
      message: '提示',
      description: msg,
      type: 'error'
    });
  } else if (data && data.code !== 0) {
    notification.open({
      message: '提示',
      description: data.msg,
      type: 'error'
    });
  }
  return data;
}, (error: any) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  return Promise.resolve(error)
});

const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
};
