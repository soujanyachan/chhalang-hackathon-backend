const express = require('express');
let router = express.Router();
const {getLocation} = require("./location");
const {userDB} = require("../models/User.js");


router.put('/:userId/update/location', getLocation);
router.post('/create', async (req, res) => {
    const resp = await userDB.insert({

    })
});

module.exports = router;