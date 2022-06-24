var router = require('express').Router()

const UserRouter = require('./UserRouter')
const FormRouter = require('./FormRouter')
const Users = require('../db/User');


router.use('/user', UserRouter)
router.use('/form', FormRouter)

router.get('/', (req, res) => {
    res.send("Router.js working fine")
})


module.exports = router;