/** 路由页 - 真正意义上的根组件，已挂载到redux上，可获取store中的内容 **/

/** 所需的各种插件 **/
import React, {useEffect} from "react";

import {HashRouter as Router, useRoutes, Routes, Route, Navigate} from "react-router-dom";

// antd的多语言
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import Loadable from "react-loadable"; // 用于代码分割时动态加载模块

/** 普通组件 **/
import Loading from "@/component/Loading"; // loading动画，用于动态加载模块进行中时显示

const LazyLoad = (loader: any, timeout?: number) =>
  Loadable({
    loader,
    loading: Loading,
    timeout
  });

/** 下面是代码分割异步加载的方式引入各页面 webpackChunkName设置生成后的js名字 **/
const MainLayout = LazyLoad(() => import('@/layout/MainLayout'));
const Home = LazyLoad(() => import('@/container/Test/home'));
const Page1 = LazyLoad(() => import('@/container/Test/page1'));
const Page2 = LazyLoad(() => import('@/container/Test/page2'));
const Page3 = LazyLoad(() => import('@/container/Test/page3'));
const NotFound = LazyLoad(() => import('@/container/Test/notfound'));

const App = () => {
  let routes = useRoutes([
    {
      path: '/', element: <MainLayout/>, children: [
        {path: 'home', element: <Home/>},
        {path: 'page1', element: <Page1/>},
        {path: 'page2', element: <Page2/>},
        {path: '/', element: <Navigate to='/home'/>}
      ]
    },
    {path: '/page3', element: <Page3/>},
    {path: '*', element: <NotFound/>}
  ]);
  return routes;
};

/** 组件 **/
export default function RouterConfig(props: any) {
  console.log(props);
  // 在组件加载完毕后触发
  useEffect(() => {
    // 可以手动在此预加载指定的模块：
    // Features.preload(); // 预加载Features页面
    // Test.preload(); // 预加载Test页面
    // 也可以直接预加载所有的异步模块
    // Loadable.preloadAll();
  }, []);

  /** 简单权限控制 路由守卫 **/
  function onEnter(component: any) {
    // 例子：如果没有登录，直接跳转至login页
    // if (sessionStorage.getItem('userInfo')) {
    //   return Component;
    // } else {
    //   return <Redirect to='/login' />;
    // }
    return component;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <App/>
      </Router>
    </ConfigProvider>
  );
}
