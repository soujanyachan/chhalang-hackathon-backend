const mongoose = require("mongoose");
const {dbConnection} = require('../db/mongo');
const skillInterestSchema = new mongoose.Schema(
    {
        "userId": String,
        "gameId": String,
        "skillScore": String,
        "interestLevel": String
    },
    {timestamps: true}
);

let skillInterestsDB = dbConnection.model('skill_interests', skillInterestSchema);


module.exports = {skillInterestsDB};
