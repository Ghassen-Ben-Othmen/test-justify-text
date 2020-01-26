const fs = require("fs");
const {
    justifyTextV2
} = require("../controllers/service.controller");

let input = fs.readFileSync("./input.txt", {
    encoding: "utf-8"
});

console.log(input, input.length);

console.log("=======================================================================")

console.log(justifyTextV2(input));