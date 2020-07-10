const $strings = {
	guid() {
		return Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
	},

	uuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		})
	},

	last(input, divider) {
		return input.split(divider).pop()
	},

	remove(input, toRemove) {
		return input.replace(toRemove, '')
	}

}

const $timestamps = {
	now() {
		return Date.now()
	},
	nowPlus(days) {
		var someDate = new Date();
		someDate.setTime(someDate.getTime() + (days * 24 * 60 * 60 * 1000))
		return someDate.getTime()
	},
	iso() {
		return new Date().toISOString()
	}
}

const $system = {
	env: (key) => {
		return process.env[key]
	}
}

module.exports = {
	$strings,
	$timestamps,
	$system
}