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
    return friendRequests.find({userId});
}

const sendFriendRequest = async (fromUserId, toUserId) => {
    const resp = await friendRequests.insert({
        fromUserId,
        toUserId
    });
    return resp;
}

const deleteFriendRequest = async ({fromUserId, toUserId}) => {
    const resp = await friendRequests.find({fromUserId, toUserId}).remove();
    return resp;
}

module.exports = {friendRequests, listFriendRequests, sendFriendRequest, deleteFriendRequest};
