const express = require('express');
let router = express.Router();
const {getLocation} = require("./location");
const {userDB} = require("../models/User.js");

router.put('/:userId/update/location', getLocation);

router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;