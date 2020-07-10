// app setup
const {app, serverless} = require('../index')
const routes = require('./auth')

app.use(routes.routes())
app.use(routes.allowedMethods())

module.exports.handler = serverless(app, {
  basePath: '/v1'
})