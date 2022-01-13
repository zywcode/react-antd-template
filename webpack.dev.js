const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: "inline-source-map", //控制台提示信息映射
  devServer: { //开发服务器
    port: "8001",
    proxy: { //反向代理，根据需求自行修改
      "/api": {
        target: "http://127.0.0.1:3000",
        pathRewrite: {
          "^/api": ""
        }
      },
    },
    // open: true,  //自动打开浏览器
    // hot: true, //让webpackDevServer开启热更新功能
    // hotOnly: true //当hot module replacement功能没生效时，也不允许浏览器重新加载
  },
  //如需热更新，开启下面代码
  plugins: [
     new webpack.HotModuleReplacementPlugin()
  ]
});
