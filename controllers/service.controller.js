let UserModel = require("../models/user.model");

const justify = async (req, res) => {

    let text = req.body
    if (!text || !text.match(/\S+/g)) {
        return res.status(400).json({
            msg: "No Input!"
        })
    }
    // find user
    let user = await UserModel.findOne({
        email: req.email
    });
    // get user's limit words per day
    let limit = user.limit;

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
        // justify Text!
        let output = justifyText(text);

        res.contentType("text/plain");
        return res.send(output);
    }

}

// justify text 
let justifyText = (input) => {

    if (input.length <= 80) return input;

    // transform text 
    // replace multi spaces with only one space
    input = input.replace(/" "{2,}/g, " ");
    // replace \n with " \n "
    input = input.replace(/(\r\n){1,}/g, "\r\n ");

    // split text with delim space
    let words = input.split(" ");

    let output = "";
    const width = 80;
    let len = 0;
    let nb_spaces_to_add = 0;
    let ligne = [];
    let stopped = false;
    for (let i = 0; i < words.length; i++) {

        if (words[i] === "\r\n" && ligne.length && ligne[ligne.length - 1].endsWith(".")) {
            nb_spaces_to_add = 0;
            stopped = true;
        } else if ((words[i] === "\r\n" && ligne.length && !(ligne[ligne.length - 1].endsWith("."))) || words[i] === "")
            continue;
        else if (len + words[i].length === width) {
            ligne.push(words[i]);
            len += words[i].length;
            stopped = true;
            nb_spaces_to_add = 0;
        } else if (len + words[i].length + 1 < width) {
            len += words[i].length + 1;
            ligne.push(words[i]);
        } else {
            len -= 1;
            stopped = true;
            nb_spaces_to_add = width - len;
            i--;
        }

        // stop if there is a . and \n or if we rich the limit
        // fill with spaces - round robin 
        if (stopped) {
            let k = 0;
            while (nb_spaces_to_add) {
                k = k % (ligne.length - 1);
                ligne[k] += " ";
                k++;
                nb_spaces_to_add--;
            }

            output += ligne.join(" ") + "\n";

            stopped = false;
            len = 0;
            nb_spaces_to_add = 0;
            ligne = [];
        }
    }
    output += ligne.join(" ");
    return output;
}


module.exports = {
    justify,
    justifyText
}