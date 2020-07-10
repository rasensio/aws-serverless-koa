// app setup
const serverless = require('serverless-http')
const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const respond = require('koa-respond')
const cors = require('@koa/cors')
var logger = require('../services/logger/logger')('api')
var identity = require('../services/identity/identity')

const app = new Koa()

app.use(cors())
app.use(respond())
app.use(bodyParser())
app.use(identity())

// request logger
app.use((ctx, next) => {
  logger.info(`${ctx.method} ${ctx.path}`)
  return next()
})

async function responseTime (ctx, next) {
  console.log('Started tracking response time')
  const started = Date.now()
  await next()
  // once all middleware below completes, this continues
  const ellapsed = (Date.now() - started) + 'ms'
  console.log('Response time is:', ellapsed)
  ctx.set('X-ResponseTime', ellapsed)
}
app.use(responseTime)

// error handler middleware
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 400
    ctx.body = `Uh-oh: ${err.message}`
    logger.error(err.message)
    logger.error(err.stack)
  }
})

// will start a local server if the dev environment is local
if (process.env.ENV == 'local') {
  console.log('starting on http://localhost:3000')
  app.listen(3000)
}

module.exports = { app, serverless }