const {
    justifyText
} = require("../controllers/service.controller");
const fs = require("fs");


test('number chars in each line should be 80 - 1 ', () => {

    let [expected, actual] = check("input.txt");

    expect(actual).toBe(expected);
});

test('number chars in each line should be 80 - 2 ', () => {

    let [expected, actual] = check("input2.txt");

    expect(actual).toBe(expected);
})

// check if all the lines are less or eq to 80
let check = (file) => {
    let input = fs.readFileSync(`${__dirname}\\${file}`, {
        encoding: "utf-8"
    });
    let output = justifyText(input);

    let lines = output.split("\n");
    let expected = lines.length;

    let actual = 0;

    lines.forEach(l => {
        if (l.length <= 80) actual++;
    });

    return [expected, actual];
}