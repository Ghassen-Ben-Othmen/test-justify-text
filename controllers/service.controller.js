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

let justifyTextV2 = (input) => {

    // if (input.length <= 80) return input;
    // input = input.replace(/" "{2,}/g, " ");
    // replace \r\n with "\n "
    input = input.replace(/(\r\n){1,}/g, "\n ");

    let parags = input.split("\n")

    let width = 80;

    let result = []

    for (para of parags) {
        let words = para.split(" ").filter(w => w);

        let n = words.length;
        let costs = [];

        // generate cost matrix
        for (let i = 0; i < n; i++) {
            let cost = Array(n).fill(-1);
            cost[i] = Math.pow(width - words[i].length, 2);
            let ind = i + 1;
            for (let j = i + 1; j < n; j++) {
                let k = i;
                let c = 0;
                while (k <= j) {
                    c += words[k].length + 1;
                    k++;
                }
                if (c - 1 > width) cost[ind] = Infinity;
                else cost[ind] = Math.pow(width - (c - 1), 2);
                ind++;
            }
            costs.push(cost);
        }

        let minCost = Array(n);
        let pos = Array(n);

        for (let i = n - 1; i >= 0; i--) {
            minCost[i] = costs[i][n - 1];
            pos[i] = n;
            for (let j = n - 1; j > i; j--) {
                if (costs[i][j - 1] === Infinity) {
                    continue;
                }
                if (minCost[i] > minCost[j] + costs[i][j - 1]) {
                    minCost[i] = minCost[j] + costs[i][j - 1];
                    pos[i] = j;
                }
            }
        }

        let output = "";
        let i = 0;

        while (i < n) {

            let line = words.slice(i, pos[i]);
            let nb_space_to_add = width - line.join(" ").length;

            let k = 0;
            for (let nb = 0; nb < nb_space_to_add; nb++) {
                k = k % (line.length - 1);
                line[k] += " ";
                k++
            }

            output += line.join(" ") + "\n";

            i = pos[i];
        }
        result.push(output);

    }

    return result.join("\n");

}


module.exports = {
    justify,
    justifyText,
    justifyTextV2
}