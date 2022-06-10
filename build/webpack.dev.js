const { merge } = require('webpack-merge')
const path = require('path')
const config = require('./webpack.config')
const env = process.env.NODE_ENV
module.exports = merge(config, {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
      watch: true
    },
    client: {
      overlay: false,
      logging: 'info',
      progress: true
    },
    host: 'localhost',
    port: '5990',
    allowedHosts: 'auto',
    open: false,
    compress: true,
    hot: false
  },
  target: 'web'
})
