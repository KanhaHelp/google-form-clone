var router = require('express').Router()

const UserRouter = require('./UserRouter')
const FormRouter = require('./FormRouter')
const Users = require('../db/User');


router.use('/user', UserRouter)
router.use('/form', FormRouter)

router.post('/create_user', (req, res) => {

    Users.create({
            name: 'kanha123',
        })
        .then((user) => { res.status(201).json(user) })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        })

})

router.get('/', (req, res) => {
    res.send("Router.js working fine")
})


module.exports = router;