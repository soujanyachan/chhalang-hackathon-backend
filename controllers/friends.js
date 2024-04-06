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

router.put('/add', async (req, res) => {
    const data = await sendFriendRequest({toUserId: req.body.toUserId, fromUserId: req.body.fromUserId});
    res.send(data);
});
router.put('/accept', acceptFriendRequest);
router.put('/reject', rejectFriendRequest);
router.post('/requests', async (req, res) => {
    let data = await listFriendRequests(req.body.username);
    res.send({requests: data});
});

router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;