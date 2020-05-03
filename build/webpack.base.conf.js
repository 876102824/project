'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var PostCompilePlugin = require('webpack-post-compile-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// var VueLoaderPlugin = require('vue-loader/lib/plugin')
var TransformModulesPlugin = require('webpack-transform-modules-plugin')
module.exports = {
  // ...
  plugins: [
    // ...
    new VueLoaderPlugin(),
    new PostCompilePlugin(),
    new TransformModulesPlugin()
  ]
  // ...
}
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {

  context: path.resolve(__dirname, '../'),
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
      "cube-ui": "cube-ui/lib",
      'src': 'src'
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      // {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
      {test:/\.(jpg|png|bmp|gif|jpeg)$/,use:'url-loader'},
      {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
      {test:/\.vue$/,use:'vue-loader'},
      {test:/\.(eot|woff|woff2|ttf)$/, use:['url-loader','file-loader'] },
      {test:/\.styl$/,
        loader:'style-loader!css-loader!stylus-loader',
        include:['node build/dev-server.js']
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueLoaderConfig
      // },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/,
        include: /node_modules/,
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude:/node_modules/,
      //   include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('media/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader!file-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      //   }
      // }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
