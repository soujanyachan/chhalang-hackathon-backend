const express = require('express');
let router = express.Router();
const {client} = require('../db/mongo');
import getLocation from "./location"
router.post('/create', async (req, res, next) => {
    client
})
router.put('users/:userId/update/location',  getLocation) ;

module.exports = router;