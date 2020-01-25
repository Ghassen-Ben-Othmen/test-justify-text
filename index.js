const express = require("express");

// const app
const app = express();

// const PORT
const PORT = process.env.PORT || 3000;

// test route
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     msg: "hi"
//   });
// });



// start server
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});