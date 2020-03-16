const express = require('express')

// 创建服务器
const app = express()

// 定义路由
app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>')
})
app.get('/user', (req, res) => {
  res.send({name: 'yxp'})
})

// 启动服务器，固定端口
app.listen(4000, (err) => {
  if (err) {
    console.log('服务器启动失败了!')
  } else {
    console.log('服务器启动成功了~')
  }
})
