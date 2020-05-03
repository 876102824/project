const routerApi = require('./router')
const bodyParser = require('body-parser')// post 数据是需要
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  req.header('Access-Control-Allow-Origin', '*')
  req.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  req.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

// 后端api路由
app.use('/api', routerApi)

// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
