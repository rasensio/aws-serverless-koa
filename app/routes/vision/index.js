var express = require('express')
var router = express.Router()
// var environment = process.env.ENV
// var region = process.env.REGION
// var VISION_TABLE = process.env.STORAGE_UPGOALVISIONTABLE_NAME

// var aws = require("aws-sdk")/

// if (!process.env.ENV) {
// }

// app variables
// const { dynamo } = require('@rasensio/lambda')
// const VISION_TABLE = 'UpgoalVisionTable-dev'

// router.get('/', (req, res, next) => {
//   get(VISION_TABLE, 'username', 'rasensio')
//     .then(result => {
//       res.json({payload: result})
//     }).catch(next)
// })

router.get('/', (req, res, next) => {
  console.log('madeitiiiitt')
  res.json({sua: 'mono'})
  // return get(VISION_TABLE, 'username', 'rasensio')
  // return dynamo.get(VISION_TABLE, 'username', 'rasensio')
})

// const get = async (table, key, value) => {
//   var params = {
//     Key: {
//       key: {S: value}
//     },
//     TableName: table
//   }
//   return await dynamo.getItem(params).promise()
// }

/*
const getVision = () => {
  return dynamo.get(VISION_TABLE, 'username', 'rasensio')
    .then((res) => res)
    .catch(err => {
      console.log("errrorrrrr")
      return {error: err}
      // console.err(err)
      // throw new Error(err)
    })
  // const result =await dynamo.get(VISION_TABLE, 'username', 'rasensio')
}
*/
/*
app.get('/vision', wrap(async (req, res) => {
  console.error('executing this')

  try {
    const result = await dynamo.get(VISION_TABLE, 'username', 'rasensio')

  } catch (e) {
    console.log('faillllllll')
    throw new Error(e)
  }
  // console.log(result)
  // throw new Error('test error')
  // let result = getVision()

  console.error('error but nothing')
  res.json(result)
  // res.json({text: 'get call succeed!', lastUpdate: new Date().toISOString()});
}))
*/

module.exports = router