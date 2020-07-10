// route setup
const router = require('koa-router')({ prefix: '/my' })
const logger = require('../../../services/logger/logger')('my')
// const TABLE_VISION = process.env.TABLE_VISION

// routes
async function get(ctx) {
  logger.debug('getting my for ')
  let userId = ctx.session.userId
  logger.debug('getting my for ' + userId)
  // maybe do your query here
  // let vision = await dynamo.get(TABLE_VISION, "userId", userId)
  let vision = {name: 'abc'}
  ctx.ok(vision)
}

router.get('/my', saveVision)

module.exports = router