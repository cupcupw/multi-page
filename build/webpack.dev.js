const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.config')
module.exports = merge(webpackBase, {
  mode: 'development',
  devServer: {
    hot: false, //
    allowedHosts: 'auto',
    client: {
      progress: true,
    },
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
})
