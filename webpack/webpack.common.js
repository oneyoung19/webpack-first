// webpack 两种mode打包时的不同之处
// mode development production none
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  // mode: 'development',
  // 最好使用绝对路径
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[hash:6].js'
  },
  module: {
    rules: [
      // js jsx
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      /*
      css
      style-loader 动态创建css标签 将css插入到head中
      css-loader 解析import语句
      postcss-loader autoprefixer 自动生成浏览器前缀
      */ 
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',]
      },
      // 图片 字体文件
      // 可以使用url-loader或者file-loader 优先使用url-loader 因为url-loader可以设置在文件大小小于指定的某值时，返回dataUrl
      // url-loader默认情况下，都会将图片转化为base64，不论大小
      {
        test: /\.(jpeg|png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 这里限制了10k 当设置这个时，也需要安装file-loader。这个功能依赖file-loader，最后会将在html中引用的图片的名转为hash值
              limit: 10240,
              // 设置limit后，也可以对名字进行一下优化。ext指的是图片的扩展名  如cat_8ea921.jpeg
              name: '[name]_[hash:6].[ext]',
              // 在支持esmodule的import的基础上，是否支持commonJs的require true(不支持，默认) false(支持)
              esModule: false,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 在使用这个之后 无需再配置dev环境下的contentBase
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      // 打包之后的文件名
      filename: 'index.html',
      minify: {
        // 是否删除属性的双引号
        removeAttributeQuotes: false,
        // 是否折叠空白
        collapseWhitespace: false
      },
      // 其他配置config
      config: {
        title: 'webpack-first'
      }
      // 是否加上hash，默认是false
      // hash: true
    })
  ]
}