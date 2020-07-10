'use strict';

const {$validation} = require('@rasensio/validation')
const chai = require('chai')
const expect = chai.expect
var event, context

describe('Testing validator', () => {
    it('verify options', async () => {
        expect($validation().config().chainable).to.equal(true)
        expect($validation().config({chainable: false}).chainable).to.equal(false)
        expect($validation().config({chainable: true}).chainable).to.equal(true)
    })

    it('verify exists function', async () => {
        // empty values
        let options = {chainable: false}
        expect($validation(options).exists()).to.equal(false)
        expect($validation(options).exists("")).to.equal(false)
        expect($validation(options).exists(" ")).to.equal(false)
        expect($validation(options).exists(undefined)).to.equal(false)
        expect($validation(options).exists(null)).to.equal(false)
        // filled values
        expect($validation(options).exists("s")).to.equal(true)
        expect($validation(options).exists(12)).to.equal(true)
        expect($validation(options).exists(32.4)).to.equal(true)
    })

    it('verify the email function', async () => {
        // negative cases
        let options = {chainable: false}
        expect($validation(options).email("")).to.equal(false)
        expect($validation(options).email("email")).to.equal(false)
        expect($validation(options).email(123)).to.equal(false)

        // postivie cases
        expect($validation(options).email("test@asdf.com")).to.equal(true)
        expect($validation(options).email("test@asdf.com.ar")).to.equal(true)
        expect($validation(options).email("test.sua@asdf.com")).to.equal(true)
    })

    it('verify the number function', async () => {
        // negative
        let options = {chainable: false}
        expect($validation(options).number()).to.equal(false)
        expect($validation(options).number("abc")).to.equal(false)
        // postive
        expect($validation(options).number(1)).to.equal(true)
        expect($validation(options).number(1.1)).to.equal(true)
    })

    it('verify the same function', async () => {
        let options = {chainable: false}
        // positive 
        let a = {a: '1', b: '2'}
        let b = {a: '1', b: '2'}
        expect($validation(options).same(a, b)).to.equal(true)
        // negative
        b = {a: '1', b: '3'}
        expect($validation(options).same(a, b)).to.equal(false)
    })

    it('verify chainability', async () => {
        
        // setup
        expect($validation().exists("abc")
            .email("good@email.com")
            .number(123)
            .hasErrors()).to.equal(false)
        // negative
        expect($validation().exists("abc")
            .email("good@email.com")
            .number("as")
            .hasErrors()).to.equal(true)
        /*
            */
    })
})
