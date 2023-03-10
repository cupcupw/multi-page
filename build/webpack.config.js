const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { resolve } = require('path')
const resolveFilename = require('art-template/lib/compile/adapter/resolve-filename')
const generateEntry = require('./utils')

const entryPathList = generateEntry('../src/views')
//现在需要 为每个js文件都打包出一个html文件
const HtmlWebpackPluginList = Object.entries(entryPathList).map(
  ([key, value]) =>
    new HtmlWebpackPlugin({
      filename: `${key}.html`,
      template: value.replace('index.js', 'html.js'),
      chunks: [key],
    }),
)

module.exports = {
  mode: 'production',
  entry: entryPathList,
  output: {
    path: path.join(__dirname, '../dist'),
    clean: true,
    filename: 'assets/js/[name].js',
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        // 详细见:https://webpack.docschina.org/guides/asset-modules/
        type: 'javascript/auto',
        loader: 'file-loader',
        options: {
          esModule: false,
          outputPath: 'assets/images',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: path.join(__dirname, 'art-template-loader'),
            options: {
              //这里将检测到的src转化为绝对路径
              resolveFilename(path, context) {
                ;/^src/.test(path) &&
                  (path = path.replace(/^src/, resolve(__dirname, '../src')))
                return resolveFilename(path, context)
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public/assets'),
          to: path.join(__dirname, '../dist/assets'),
        },
      ],
    }),
    ...HtmlWebpackPluginList,
  ],
}
