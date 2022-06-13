const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
module.exports = {
  entry: {
    app: '/src/index.js'
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    modules: ['node_modules', path.resolve(__dirname, '../node_modules')],
    extensions: ['.js', '.vue', '.json', '.ts', '.mjs', '.jsx', '.tsx', 'wasm']
  },
  module: {
    noParse: /^(vue|vue-router|vuex)/,
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          'postcss-loader',
          'stylus-loader'
        ],
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              esModule: false,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ],
        exclude: /static/
      },
      {
        test: /\.(mp4|mp3|m3u8)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'media/[name].[contenthash:8].[ext]'
            }
          }
        ],
        exclude: /node_modules|static/
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/babel-loader')
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        ],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules | ^TcPlayer | static/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].min.css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app'],
      template: 'public/index.html',
      // scriptLoading: 'defer',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist/')
        }
      ]
    }),
    new FriendlyErrorsWebpackPlugin(),
    new EslintWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
    // new HardSourceWebpackPlugin()
  ],
  optimization: {
    chunkIds: 'named',
    moduleIds: 'size',
    splitChunks: {
      maxSize: 300000,
      minSize: 30000,
      maxInitialRequests: 10,
      automaticNameDelimiter: '_',
      cacheGroups: {
        react: {
          test: /(react|react-router-dom)/,
          name: 'js/react.bundle.js',
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true
        }
      }
    }
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'eval-cheap-module-source-map',
  stats: 'minimal'
}
