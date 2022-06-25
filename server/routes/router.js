var router = require('express').Router()

const UserRouter = require('./UserRouter')
const FormRouter = require('./FormRouter')
const Users = require('../db/User');


router.use('/user', UserRouter)
router.use('/form', FormRouter)

router.get('/', (req, res) => {
    res.send("Hello From backend API Server")
})


module.exports = router;