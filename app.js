const { request } = require("express");
const express = require("express");
const app = express();
const bodyparse = require('body-parser');

app.use(bodyparse.json());
require("dotenv/config");
const mongoose = require("mongoose");

// Import Routes
const postRoute = require('./routes/posts');
app.use('/posts', postRoute);

app.get('/', (req, res) => {
	res.send("We are at home");
});
// to return on bad url requests
app.all('*', function (req, res) {
	throw new Error("Bad request")
})
// status 400 in case for example : http://localhost:3000/nonexists 
app.use(function (e, req, res, next) {
    if (e.message === "Bad request") {
        res.status(400).json({ error: { msg: e.message, stack: e.stack } });
    }
});

app.listen("3000");
//connect to database 
//	database info: cloudmongodb.com sandbox aws free tier 500mb. aws/frankfurt.

mongoose.connect(process.env.DB_Connection,
	{ "useNewUrlParser": true }, () => console.log("connected to db"));

//mongoose.disconnect(() => console.log("disconeected"));
