'use strict';

const {$strings, $timestamps, $system} = require('@rasensio/utils')
const chai = require('chai')
const expect = chai.expect
var event, context

describe('Testing strings', () => {
    it('verify guid', async () => {
        console.log($strings().guid())
        console.log($system().env('TEST'))
        console.log($strings().guid())
        console.log($strings().guid())
        console.log($strings().guid())
        console.log($strings().guid())
        expect($strings().guid()).to.noequal(true)
    })

})
