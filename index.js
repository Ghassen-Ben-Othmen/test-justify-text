const express = require("express");
const mongoose = require("mongoose");
const {
    register,
    authenticate
} = require('./controllers/user.controller');

// config dotenv
require("dotenv").config();

// const PORT
const PORT = process.env.PORT || 3000;

// const app
const app = express();

// body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// //test route
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     msg: "hi"
//   });
// });

// user signup route
app.post("/api/register", register)

// user login
app.post("/api/token", authenticate)

// connect to database
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASSWORD}@test-justify-text-cluster-mw8ml.mongodb.net/test?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        app.listen(PORT, () => {
            // start server
            console.log(`server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });