const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: './src/index.tsx',
  },  // 入口文件
  output: {
    filename: '[name].[chunkhash:8].bundle.js',  // 定义输出文件名
    path: path.resolve(__dirname, 'dist')    // 定义输出文件夹dist路径
  },
  plugins: [
    new CleanWebpackPlugin({  // 每次打包前删除dist文件夹中的文件
      cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.ico', '!lib/**'],//dist文件夹下的favicon.ico文件和lib文件夹下的东西都忽略不进行删除
    }),
    new HtmlWebpackPlugin({
      // title: 'index'  //如果项目没有html文件作为模板入口，可使用title和filename进行自动创建，这里使用模板
      // filename: 'index.html',
      template: './public/index.html', //指定html模板文件
      favicon: './public/favicon.ico', //指定网站图标
      inject: 'head' //js插入的位置，插入head中也会自动补defer="defer"属性以保证在页面加载后执行js，如果考虑兼容性可改成body
      // minify: {
      //     removeAttributeQuotes: true // 可移除属性的引号
      // }
    }),
    new MiniCssExtractPlugin({ //css独立打包
      filename: "[name]-[contenthash].css"
    }),
    new Webpack.ProvidePlugin({ //全局引入jquery，此后在任何位置可直接使用$，Lodash或其他库也可以像这样引入，当然也可以在dist目录的lib文件夹下放第三方库，在html模板中直接引入
      '$':'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"  //es6+转换es5
        }
      },
      {
        test: /\.s[ac]ss$/,  //sass/scss转换css
        use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
      },
      {
        test: /\.css/,
        use:[
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp|jfif)$/, //图片打包
        use: [
          {
            loader: "url-loader",  //图片base64化
            options: {
              limit: 1024 * 100,  //小于100kb的图片会被base64
              name: "assets/[name]_[hash:10].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/, //CSV/TSV文件打包
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/, //XML文件打包
        use: [
          'xml-loader',
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css', 'scss', '.wasm'], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
