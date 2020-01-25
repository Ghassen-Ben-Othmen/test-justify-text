let UserModel = require("../models/user.model");

const justify = async (req, res) => {

    let text = req.body
    // find user
    let user = await UserModel.findOne({
        email: req.email
    });
    // get user's limit words per day
    let limit = user.limit;
    console.log(text.split(" ").length)

    if (limit < text.split(" ").length) {
        return res.status(402).json({
            msg: "Payment Required"
        })
    } else {
        let new_limit = limit - text.split(" ").length;
        await UserModel.updateOne({
            email: req.email
        }, {
            limit: new_limit
        })

        return res.send(text)
    }

}

module.exports = justify