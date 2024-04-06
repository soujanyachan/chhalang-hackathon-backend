const express = require('express');
let router = express.Router();
const {getLocation} = require("./location");
router.post('/create', async (req, res, next) => {
    console.log(req.body);
    const update = UserDB.insertOne(req.body);
    console.log(update);
    res.send({
        success: true,
        message: "created profile",
        data: {update, test}
    })
})
router.put('users/:userId/update/location', getLocation) ;

module.exports = router;