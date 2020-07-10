
class Logger {
	constructor(name, level) {
		this.INFO = "INFO"
		this.DEBUG = "DEBUG"
		this.ERROR = "ERROR"
		this.WARN = "WARN"
		this.DEBUG_GROUP = "INFO,WARN,ERROR,DEBUG"
		this.INFO_GROUP = "INFO,WARN,ERROR"
		this.WARN_GROUP = "WARN,ERROR"
		this.ERROR_GROUP = "ERROR"

		this.name = name
		if (level) {
			this.level = level
		} else {
			if (process.env.LOG_LEVEL) {
				this.level = process.env.LOG_LEVEL
			} else {
				this.level = this.INFO
			}
		}
	}

	log(level, value) {
		switch (this.level) {
			case this.INFO:
				if (this.INFO_GROUP.includes(level)) {
					console.log(`${level} ${this.name} - ${value}`)
				}
				break
			case this.WARN:
				if (this.WARN_GROUP.includes(level)) {
					console.warn(`${level} ${this.name} - ${value}`)
				}
				break
			case this.ERROR:
				if (this.INFO_GROUP.includes(level)) {
					console.error(`${level} ${this.name} - ${value}`)
				}
				break
			case this.DEBUG:
				if (this.DEBUG_GROUP.includes(level)) {
					console.log(`${level} ${this.name} - ${value}`)
				}
				break
		}
	}

	line() {
		console.log('----------------------------------')
	}

	table(value, obj) {
		this.line()
		console.log(value)
		console.table(obj)
		this.line()
	}

	info(value) {
		this.log(this.INFO, value)
	}

	debug(value) {
		this.log(this.DEBUG, value)
	}

	error(value) {
		this.log(this.INFO, value)
	}
}


const logger = (name, level) => {
	if (process.env.ENV == 'local') {
		level = 'DEBUG'
	}
	return new Logger(name, level)
}

module.exports = logger