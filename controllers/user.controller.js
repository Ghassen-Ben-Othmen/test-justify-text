const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

let register = (req, res) => {

    let user = new UserModel(req.body);

    user.save().then(user => {
        if (user)
            return res.status(201).json({
                success: true,
                msg: "You have been successfully registred!"
            });

    }).catch(err => {
        // error
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: "Please check you email!"
        })
    })
}

let authenticate = async (req, res) => {

    let token;

    try {
        let user = await UserModel.findOne({
            email: req.body.email
        })

        if (user) {
            // user not authenticated
            if (user.token === "") {
                // generate token
                token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                    process.env.JWT_KEY, {
                        expiresIn: "24h"
                    }
                );
                // update user with token & limit
                await UserModel.updateOne({
                    email: req.body.email
                }, {
                    email: req.body.email,
                    token,
                    limit: 80000
                });

                return res.status(200).json({
                    auth: true,
                    token
                })
            } else {
                // user has a token
                try {
                    // check token
                    jwt.verify(user.token, process.env.JWT_KEY);
                    // if token not expired
                    console.log("not expired")
                    return res.status(200).json({
                        auth: true,
                        token: user.token
                    })
                } catch (err) {
                    // if token expired then generate new one
                    console.log("expired!!")
                    token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "24h"
                        }
                    );
                    // update user with token & limit
                    await UserModel.updateOne({
                        email: req.body.email
                    }, {
                        email: req.body.email,
                        token,
                        limit: 80000
                    });

                    return res.status(200).json({
                        auth: true,
                        token
                    })

                }
            }

        } else {
            // if there is no user with the specified email
            res.status(400).json({
                auth: false,
                msg: "Please check you email!"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            auth: false,
            msg: "Try later!"
        })
    }
}

module.exports = {
    register,
    authenticate
}