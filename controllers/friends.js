const express = require('express');
let router = express.Router();
const {sendFriendRequest, acceptFriendRequest, acceptFriendRequest, listRequests} = require("../models/friendRequests");

router.put('/add', sendFriendRequest);
router.put('/accept', acceptFriendRequest);
router.put('/reject', acceptFriendRequest);
router.put('/requests', listRequests);

router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;