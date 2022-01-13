const { Router } = require('express')
const router = Router()
const teapot = require('../../controller/teapot.controller/teapot.controller')

router.route('/')
    .get(teapot.get)

module.exports = router
