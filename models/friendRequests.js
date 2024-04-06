const mongoose = require("mongoose");
const {dbConnection} = require('../db/mongo');
const friendRequestSchema = new mongoose.Schema(
    {
        fromUserId: String,
        toUserId: String,
    },
    {timestamps: true}
);

let friendRequests = dbConnection.model('friend_requests', friendRequestSchema);

const listFriendRequests = (userId) => {
    return friendRequests.find({toUserId: userId}, {fromUserId: 1});
}

const sendFriendRequest = async ({fromUserId, toUserId}) => {
    try {
        const resp = await friendRequests.insertOne({
            fromUserId,
            toUserId
        });
        return resp;
    } catch (e) {

    }
}

const deleteFriendRequest = async ({fromUserId, toUserId}) => {
    try {
        const resp = await friendRequests.deleteOne({fromUserId, toUserId});
        return resp;
    } catch (e) {

    }
}

module.exports = {friendRequests, listFriendRequests, sendFriendRequest, deleteFriendRequest};
