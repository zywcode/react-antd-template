// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import store from "@/store";
import RouterConfig from "./router";

if (module && module.hot) {
  module.hot.accept();
}

const Root = (props: any) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Router>
          <RouterConfig/>
        </Router>
      </Provider>
    </ConfigProvider>
  );
}
ReactDOM.render(<Root/>, document.querySelector('#root'));
