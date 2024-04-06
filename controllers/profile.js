const express = require('express');
let router = express.Router();

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

module.exports = router;