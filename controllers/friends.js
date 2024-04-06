const express = require('express');
let router = express.Router();
const {sendFriendRequest, acceptFriendRequest, rejectFriendRequest, listFriendRequests} = require("../models/friendRequests");

router.put('/add', sendFriendRequest);
router.put('/accept', acceptFriendRequest);
router.put('/reject', rejectFriendRequest);
router.put('/requests', listFriendRequests);

router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;