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
    const filter = {
        'game_id': {
            '$in': ids
        }
    };
    const result = await gameDB.find(filter)
    return result
}

module.exports = {
    gameDB,
    findGamesByIds
};
