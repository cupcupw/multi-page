const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(webpackBase, {
  mode: 'development',
  // loader 配置
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          //兼容多浏览器的css
          'postcss-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash].css',
    }),
  ],
})
