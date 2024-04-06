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

const sendFriendRequest = (fromUserId, toUserId) => {

}

const acceptFriendRequest = (fromUserId, toUserId) => {
};

const rejectFriendRequest = (fromUserId, toUserId) => {
}

module.exports = {friendRequests, listFriendRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest};
