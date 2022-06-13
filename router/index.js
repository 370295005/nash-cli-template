const router = require('koa-router')()
const { SuccessModel } = require('../model/resModel')
router.get('/', async (ctx, next) => {
  console.log('koa2')
  ctx.body = new SuccessModel('success')
})

module.exports = router
