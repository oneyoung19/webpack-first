const merge = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    // dev打包时无需清理dist，所以在prod.js中设置
    new CleanWebpackPlugin()
    // dev环境下也有html-webpack-plugin 貌似会自动寻找静态资源
  ]
})
