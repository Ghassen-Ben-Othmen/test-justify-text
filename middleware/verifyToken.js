const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let verifyToken = async (req, res, next) => {

    try {
        let token = req.headers.authorization;
        let user = await UserModel.findOne({
            token
        })
        if (user) {

            let decoded = jwt.verify(token, process.env.JWT_KEY);
            req.email = decoded.email;
            next();
        } else {
            return res.status(401).json({
                auth: false,
                msg: "Unauthorized"
            })
        }
    } catch (err) {
        return res.status(401).json({
            auth: false,
            msg: "Unauthorized"
        })
    }

}

module.exports = verifyToken;