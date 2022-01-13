const { Router } = require('express')
const teapot = require('./teapot.route/teapot.route')
const auth = require('./auth.route/auth.route')
const router = Router()

router.use('/teapot', teapot)
router.use('/auth', auth)

module.exports = router
