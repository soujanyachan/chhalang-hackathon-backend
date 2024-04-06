const mongoose = require("mongoose");
const {dbConnection} = require('../db/mongo');
const loginSchema = new mongoose.Schema(
    {
        user_id: String,
        static_token: String,
        dynamic_token: String,
        last_login_time: Date,
        password: String
    },
    {timestamps: true}
);

let gameDB = dbConnection.model('logins', loginSchema);

module.exports = {gameDB};
