require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');

const app = express ();
app.use(cors());
app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: true }));

const db  =require("./models");
const { sequelize } = require('./config/db.config.js');

db.sequelize_config.sync(
    {force: false}
).then(() =>{
    console.log("DB re-synced")
});

require("./routes/admins.routes.js")(app);

const PORT = process.env.PORT || 5000;
app.listen (PORT, () => {
    console.log(`Schoolserver is running on port ${PORT}`);
});