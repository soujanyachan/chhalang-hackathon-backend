const express = require('express');
let router = express.Router();
const {updateLocation} = require("./location");
const {findBuddies} = require("./contact");

router.put('/:userId/update/location', updateLocation);
router.get("/:userId/buddy", findBuddies);


router.post('/register', async (req, res) => {
    // insert into logins
    // create a user.
});

module.exports = router;