// webpack 两种mode打包时的不同之处
// mode development production none
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

module.exports = {
  // mode: 'development',
  // 最好使用绝对路径
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[hash:6].js',
    // 这里的chunkFilename用来定义除了主bundle以外的bundle名。这些bundle可以在代码分割以及动态导入中产生。
    chunkFilename: '[name].[hash:6].js'
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
      style-loader 动态创建css标签 将css写入到<style>标签 插入到head中
      css-loader 解析import语句
      postcss-loader autoprefixer 自动生成浏览器前缀
      */ 
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader',]
        // 使用mini-css-extract-plugin来将css分离出来main.css，并使用link标签在html中自动引入样式表main.css 不再使用style-loader
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 开发环境下修改css样式文件也开启热更新（默认情况下修改是不触发热更新的）
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              // reloadAll: true,
            }
          },
          {
            loader: 'css-loader'
          }
        ]
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
              // 输出到dist文件夹下的某个目录
              outputPath: 'img'
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
    }),
    // devServer的contentBase默认是在根目录下。copy-webpack-plugin这个插件最好先设置在webpack.base.js中，虽然现在看起来prod环境更有用
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static'),
        // 设置flatten后，拷贝时不会拷贝目录，只会拷贝文件 譬如 static/js/console.js => static/console.js
        // flatten: true
      },
      {
        from: path.resolve(__dirname, '../favicon.ico'),
        to: 'favicon.ico'
      }
    ]),
    // 使用之前所有的css会被打包到bundle.js中。用该插件可以分离css。
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    // 抽离出来的css文件内容默认是没有压缩的。为了压缩可以使用optimize-css-assets-webpack-plugin。另外开发环境无需压缩，所以这部分移到prod.js中
    // new OptimizeCssAssetsWebpackPlugin()
  ],
  resolve: {
    // 默认情况下，导入语句只会在node_modules里寻找。可通过配置该选项增加默认的寻找文件，（从左至右）：
    modules: [path.resolve(__dirname, '../src/components'), 'node_modules'],
    // 别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    // 自动解析扩展名 （从左至右）
    extensions: ['.vue', '.js', '.json',]
  }
}