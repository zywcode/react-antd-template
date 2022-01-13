const { merge } = require('webpack-merge'); //引入配置文件合并工具
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const common = require('./webpack.common.js'); //引入公共配置

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],//css压缩混稀
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]//js压缩混稀
  }
});
