const path = require('path')
const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const env = process.env.NODE_ENV
const plugins = env === 'analyzer' ? [new BundleAnalyzerPlugin()] : []
module.exports = merge(config, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/hainengtrain/',
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js'
  },
  plugins: [new CompressionPlugin({}), ...plugins],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩js
      new TerserPlugin({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        parallel: true,
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ]
  },
  devtool: false
})
