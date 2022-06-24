var router = require('express').Router()
const UserService = require('../services/UserService')

router.route("/login")
router.get(UserService.loginGet)
router.post(UserService.login)
router.post("/create", UserService.createUser)


module.exports = router;