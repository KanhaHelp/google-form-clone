const UserModel = require('../db/User')
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const { v4: uuidv4 } = require('uuid')

const createUser = () => {
    Users.create({
        name: 'kanha123',
    })
}

module.exports = {
    loginGet: async (req, res) => {
        try {
            var result = await UserModel.find().lean();
            res.send(result);
        } catch (e) {
            res.send(e);
        }
    },

    login: async (req, res) => {
        console.log(req.body.email);
        try {
            var result = await UserModel.findOne({ email: req.body.email }).lean()
            // console.log(result);

            if (!result) {
                var gData = {
                    name: req.body.name,
                    email: req.body.email,
                    image: req.body.image
                }
                console.log(gData);

                var newUser = new UserModel(gData)
                newUser.save().then((docs) => {
                    var user = {
                        id: docs._id,
                        name: docs.name,
                        email: docs.email,
                        image: docs.image
                    }
                    console.log(user);

                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                    // console.log(accessToken);

                    res.status(200).json({
                        accessToken
                    });
                })
            } else {
                var user = {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    image: result.image
                }
                // console.log(user);

                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                // console.log(accessToken);
                res.status(200).json({
                    accessToken
                });
            }

        } catch (error) {
            res.send(error)
        }
    },

    createUser: async (req, res) => {

        try {
            //if email not find in email then create a Guest user
            if (!req.body.email) {

                let data = {
                    guestId: uuidv4(),
                    userType: "Guest"
                }

                let newUser = await UserModel.create(data);

                if (newUser) {

                    var userData = {
                        id: newUser._id,
                        guestId: newUser.guestId,
                        userType: newUser.userType,
                    }
                    const accessToken = jwt.sign(userData, 'KKKKK', { expiresIn: '24h' });

                    return res.status(200).json({
                        success: true,
                        data: userData,
                        accessToken
                    });

                }
            }

            //if email find then create member
            if (req.body.email) {

                var result = await UserModel.findOne({ email: req.body.email }).lean()

                if (!result) {
                    let data = {
                        email: req.body.email,
                        name: req.body.name ? req.body.name : '',
                        userType: "Member"
                    }

                    let newUser = await UserModel.create(data);

                    if (newUser) {

                        var userData = {
                            id: newUser._id,
                            email: newUser.email,
                            guestId: newUser.guestId,
                            userType: newUser.userType,
                        }
                        const accessToken = jwt.sign(userData, 'KKKKK', { expiresIn: '24h' });

                        return res.status(200).json({
                            success: true,
                            data: userData,
                            accessToken
                        });

                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "User having this email is already exist",
                    });
                }
            }

        } catch (error) {
            res.send(error);
        }

    }

}