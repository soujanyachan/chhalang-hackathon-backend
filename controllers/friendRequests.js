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

const findFriendRequests = (userId) => {
    return friendRequests.find({userId});
}

module.exports = {friendRequests, findFriendRequests};
