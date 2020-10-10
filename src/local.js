/**
 * this file will start he environment in a local form
 * with all the APIs
 */

// app setup
process.env.ENV = 'local'
const {app, serverless} = require('./index')

const my = require('./routes/my/my')
app.use(my.routes())
app.use(my.allowedMethods())

module.exports.handler = serverless(app)