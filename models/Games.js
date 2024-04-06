const mongoose = require("mongoose");
const {dbConnection} = require('../db/mongo');
const gameSchema = new mongoose.Schema(
    {
        game_id: Number,
        game_name: String,
        game_url: String
    },
    {timestamps: true}
);

let gameDB = dbConnection.model('games', gameSchema);

const findGamesByIds = async (ids) => {
    const resp = await gameDB.findOne({game_id: "1"});
    return resp;
}

module.exports = {
    gameDB,
    findGamesByIds
};
