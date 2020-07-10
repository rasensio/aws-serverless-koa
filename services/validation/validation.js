const logger = require('../logger')("validation")

class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

class Validation {
  constructor(options) {
    this.EMAIL = "email"
    this.NUMBER = "number"
    this.EXISTS = "exists"
    this.EMPTY = "empty"
    this.SAME = "same"

    this.errors = []
    this.options = {
      chainable: true
    }
    this.config(options)
  }

  pushError(type, value, name) {
    this.errors.push({ type, value, name})
  }

  hasErrors() {
    return this.errors.length > 0
  }

  config(options) {
    if (options) {
      this.options = { ...this.options, ...options }
    }
    return this.options
  }

  response(result, type, input) {
    if (result === false) {
      this.pushError(type, input)
    }
    return this.options.chainable ? this : result
  }

  hasValue(input) {
    return !(!input || 0 === (input + '').trim().length)
  }

  exists(input, name) {
    let result = !(!input || 0 === (input + '').trim().length)
    return this.response(result, this.EXISTS, input, name)
  }

  email(input, name) {
    let result = false
    if (this.hasValue(input)) {
      result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
    }
    return this.response(result, this.EMAIL, input, name)
  }

  number(input, name) {
    let result = false
    if (this.hasValue(input)) {
      result = typeof input === "number"
    }
    return this.response(result, this.NUMBER, input, name)
  }

  same(source, target) {
    // Create arrays of property names
    var sourceProps = Object.getOwnPropertyNames(source)
    var targetProps = Object.getOwnPropertyNames(target)

    // If number of properties is different,
    // objects are not equivalent
    if (sourceProps.length != targetProps.length) {
      return this.response(false, this.SAME, source)
    }

    for (var i = 0; i < sourceProps.length; i++) {
      var propName = sourceProps[i]
      // If values of same property are not equal,
      // objects are not equivalent
      if (source[propName] !== target[propName]) {
        return this.response(false, this.SAME, source)
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return this.response(true, this.SAME, source)
  }

  evaluate() {
    if (this.errors.length > 0) {
      logger.error("validation errors")
      logger.table(this.errors)
      throw new ValidationError('There are validation errors')
    }
  }
}

// shortcuts
const $isEmpty = (value) => {
  return Object.keys(value).length < 1
}

const $validation = (options) => {
  return new Validation(options)
}

module.exports = {
  $validation,
  $isEmpty
}