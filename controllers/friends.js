const express = require('express');
let router = express.Router();
const {addFriendsToUser, searchForNewFriends} = require('../models/User')
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
    await deleteFriendRequest({fromUserId, toUserId})
};

router.put('/add', async (req, res) => {
    const data = await sendFriendRequest({toUserId: req.body.toUserId, fromUserId: req.body.fromUserId});
    res.send(data);
});
router.post('/accept', async (req, res) => {
    const toUserId = req.body.username
    const fromUserId = req.body.friend_username
    const data = await acceptFriendRequest(fromUserId, toUserId);
    res.send(data);
});
router.post('/reject', async (req, res) => {
    const toUserId = req.body.username
    const fromUserId = req.body.friend_username
    const data = await rejectFriendRequest(fromUserId, toUserId);
    res.send(data);
});

router.post('/requests', async (req, res) => {
    let data = await listFriendRequests(req.body.username);
    res.send({requests: data});
});

router.post('/search', async (req, res) => {
    let data = await searchForNewFriends(req.body.username);
    res.send({friends: data});
});

router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;