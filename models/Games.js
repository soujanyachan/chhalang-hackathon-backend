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
    const {MongoClient} = require('mongodb')
    const filter = {
        'game_id': {
            '$in': ids
        }
    };

    const client = await MongoClient.connect(
        'mongodb+srv://athena:athena123!@cluster-0.nexccgk.mongodb.net/'
    );
    const coll = client.db('gameskraft').collection('games');
    const cursor = coll.find(filter);
    const result = await cursor.toArray();
    await client.close();
    return result
}

module.exports = {
    gameDB,
    findGamesByIds
};
