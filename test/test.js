const fs = require("fs");
const {
    justifyText
} = require("../controllers/service.controller");

let input = fs.readFileSync("./input.txt", {
    encoding: "utf-8"
});

console.log(input, input.length);

console.log("=======================================================================")

console.log(justifyText(input));

// input = input.replace(/" "{2,}/g, " ");
// // // replace \n with " \n "
// input = input.replace(/(\r\n){1,}/g, "\n ");
// console.log(input.split("\n")[1].split(" ").filter(e => e))