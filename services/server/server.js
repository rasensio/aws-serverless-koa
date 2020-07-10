const $response = {
	ok: (res, data) => {
		res.json({
			status: 'ok',
			data: data
		})
	},
	bad: (res, data) => {
		res.status(400)
			.json({
				status: 'bad',
				data: data
			})
	},
	error: (res, data) => {
		res.status(500)
			.json({
				status: 'error',
				data: data
			})
		},
	forbidden: (res, data) => {
		res.status(403)
			.json({
				status: 'forbidden',
				data: data
			})
		}
}

module.exports = {
	$response
}