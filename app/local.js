/**
 * this file will start he environment in a local form
 * with all the APIs
 */

// app setup
const {app, serverless} = require('./index')

const auth = require('./auth/auth')
app.use(auth.routes())
app.use(auth.allowedMethods())

const organization = require('./organization/OrganizationApi')
app.use(organization.routes())
app.use(organization.allowedMethods())

const user = require('./user/user')
app.use(user.routes())
app.use(user.allowedMethods())

const vision = require('./vision/vision')
app.use(vision.routes())
app.use(vision.allowedMethods())

module.exports.handler = serverless(app, {
  basePath: '/v1'
})