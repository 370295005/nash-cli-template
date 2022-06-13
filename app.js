const Koa = require('koa')
const app = new Koa()
const path = require('path')
const static = require('koa-static')
const cors = require('koa2-cors')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const morgan = require('koa-morgan')
const { accessWriteStream } = require('./utils/log')

const env = process.env.NODE_ENV

// 路由
const index = require('./router/index')

// 中间件
// 允许上传图片
app.use(static(path.join(__dirname, './public')))
app.use(
  cors({
    credentials: true
  })
)
app.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())

// 日志，记录接收请求到处理完请求的时间3
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(
  morgan(env === 'production' ? 'combined' : 'dev', {
    stream: accessWriteStream
  })
)

// 注册路由
app.use(index.routes()).use(index.allowedMethods())

module.exports = app
