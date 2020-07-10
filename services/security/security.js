// validation for jwt
// lib @ https://github.com/99xt-incubator/cognito-jwt-token-validator
const Validator = require('cognito-jwt-token-validator').Validator
const issuer = process.env.JWT_ISSUER
const audience = process.env.JWT_AUDIENCE
const validator = new Validator(issuer, audience)

var jwtSimple = require('jwt-simple')
const ALGORITHM = 'HS512'

const $jwt = {
	encode: (payload, secret) => {
		return jwtSimple.encode(payload, secret, ALGORITHM)
	},

	decode: (token, secret) => {
		return jwtSimple.decode(token, secret, false, ALGORITHM);
	}
}

module.exports = {
	$jwt
}