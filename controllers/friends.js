const express = require('express');
let router = express.Router();
const {addFriendsToUser, deleteFriendsFromUser} = require('../models/User')
const {sendFriendRequest, listFriendRequests, deleteFriendRequest} = require("../models/friendRequests");

const acceptFriendRequest = async (fromUserId, toUserId) => {
    try {
        await addFriendsToUser({userId: toUserId, friendId: fromUserId})
        await deleteFriendRequest({fromUserId, toUserId})
    } catch (e) {
        console.log(e);
    }
};

const rejectFriendRequest = async (fromUserId, toUserId) => {
    await deleteFriendsFromUser({userId: toUserId, friendId: fromUserId})
    await deleteFriendRequest({fromUserId, toUserId})
};

router.put('/add', sendFriendRequest);
router.put('/accept', acceptFriendRequest);
router.put('/reject', rejectFriendRequest);
router.put('/requests', listFriendRequests);

router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;