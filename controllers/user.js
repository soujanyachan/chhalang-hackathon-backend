const express = require('express');
let router = express.Router();
const {updateLocation} = require("./location");

router.put('/:userId/update/location', updateLocation);

router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;