const mongoose = require("mongoose");
const {dbConnection} = require("../db/mongo");
const _ = require('lodash');
const {MongoClient} = require("mongodb");
const userSchema = new mongoose.Schema(
    {
        userId: String,
        username: String,
        maxConnectionRadius: Number,
        friends: [String],
        profile: {
            name: String,
            default_location: String,
            phone: String,
        },
        userLocation: {
            location: {
                type: String,
                coordinates: [mongoose.Schema.Types.Decimal128],
            },
        },
    },
    {timestamps: true}
);

let userDB = dbConnection.model("users", userSchema);

const getIdFromUserName = async (username) => {
    return userDB.find({username});
};

const addFriendsToUser = async ({fromUserId, toUserId}) => {
    const {MongoClient} = require('mongodb')
    const client = await MongoClient.connect(
        'mongodb+srv://athena:athena123!@cluster-0.nexccgk.mongodb.net/'
    );
    const coll = client.db('gameskraft').collection('users');
    const cursor = coll.find({userId: toUserId});
    const result = await cursor.toObject();
    await client.close();
    cursor.friends = [...result.friends || [], fromUserId]
    await cursor.save();
};

const deleteFriendsFromUser = async ({fromUserId, toUserId}) => {
    const user = await userDB.find({userId: toUserId});
    const friends = _.filter(user.friends, x => x === fromUserId);
    user.friends = friends;
    await user.save();
};

const findFriends = async (userId) => {
    // const data = await userDB.find({userId: })
}

module.exports = {userDB, getIdFromUserName, deleteFriendsFromUser, addFriendsToUser}

