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
    const resp = await friendRequests.insert({
        fromUserId,
        toUserId
    });
    return resp;
}

const deleteFriendRequest = async ({fromUserId, toUserId}) => {
    const resp = await friendRequests.deleteOne({fromUserId, toUserId});
    return resp;
}

module.exports = {friendRequests, listFriendRequests, sendFriendRequest, deleteFriendRequest};
