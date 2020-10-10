// route setup
const router = require('koa-router')({ prefix: '/my' })
const logger = require('../../../services/logger/logger')('my')

// routes
async function get(ctx) {
  logger.debug('test my function')
  let test = {name: 'abc'}
  ctx.ok(test)
}

router.get('/', get)

module.exports = router