const mongoose = require("mongoose");
const {dbConnection} = require('../db/mongo');
const gameSchema = new mongoose.Schema(
    {
        game_id: Number,
        game_name: String,
        game_url: String,
        redirect_url: String
    },
    {timestamps: true}
);

let gameDB = dbConnection.model('games', gameSchema);

module.exports = {gameDB};
