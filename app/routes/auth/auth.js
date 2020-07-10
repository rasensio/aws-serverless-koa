// route setup
const router = require('koa-router')({ prefix: '/auth' })
const {$validation, $isEmpty}  = require('../../../services/validation/validation')
var {$strings, $timestamps, $system} = require('../../../services/utils/utils')
const $dynamo = require('../services/dynamo')
var $users = require('../services/dao/users')
var logger = require('../../../services/logger/logger')('auth')

/**
 * will login the user, if the user exists, will just update last
 * login, if not, will create an entry in the db
 * @param {context} ctx 
 */
async function login(ctx) {
  let request = ctx.request.body
  let email = request.email
  let userId = request.userId
  let name = request.name
  let params = {
    email: email,
    userId: userId
  }
  logger.debug(`searching user ${email}`)
  let user = await $users.getByEmail(email)

  // prep for any option
  let payload = { email, userId, name }
  payload.lastLogin = $timestamps.iso()

  if (!user) {
    //TODO fix this
    logger.info(`user ${userId} first login, creating in db`)
    user = await $dynamo.insert(TABLE_USERS, payload)
  }

  logger.debug(`updating last login of ${user.userId}`)
  
  // await $dynamo.insert(TABLE_USERS, payload)
  ctx.ok(user)
}

function status(ctx) {
  ctx.ok(ctx.req.requestContext)
}

// routes
router.get('/status', status)
router.post('/login', login)

module.exports = router