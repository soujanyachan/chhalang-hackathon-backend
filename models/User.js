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
    const cursor = await userDB.findOne({userId: toUserId});
    const friends = _.values(cursor.friends);
    cursor.friends = [...friends || [], fromUserId]
    await cursor.save();
};

const deleteFriendsFromUser = async ({fromUserId, toUserId}) => {
    const user = await userDB.find({userId: toUserId});
    const friends = _.filter(_.values(user.friends), x => x === fromUserId);
    user.friends = friends;
    await user.save();
};

const findFriends = async (userId) => {
    // const data = await userDB.find({userId: })
}

module.exports = {userDB, getIdFromUserName, deleteFriendsFromUser, addFriendsToUser}

