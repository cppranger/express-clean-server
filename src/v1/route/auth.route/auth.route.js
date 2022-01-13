const { Router } = require('express')
const router = Router()
const auth = require('../../controller/auth.controller/auth.controller')

router.route('/')
    .get(auth.get)

module.exports = router
