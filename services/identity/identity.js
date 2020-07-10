var logger = require('../logger')('identity')

const middleware = async function identity(ctx, next) {

  console.log(ctx.req.requestContext)

  // mimic the session if user is local
  if (process.env.ENV == 'local') {
    let session = {
      name: 'Rodrigo',
      email: 'rasensio@gmail.com',
      userId: 'Facebook_10159269670219942',
      scopes: null
    }
    ctx.session = session
  } else if (ctx.req.requestContext.authorizer.jwt) {
    let jwt = ctx.req.requestContext.authorizer.jwt
    let session = {
      name: jwt.claims.name,
      email: jwt.claims.email,
      userId: jwt.claims['cognito:username'],
      scopes: jwt.scopes
    }
    ctx.session = session
    logger.debug('injected session for user ' + session.userId)
  }


  await next()
}

module.exports = () => {
  return middleware
}