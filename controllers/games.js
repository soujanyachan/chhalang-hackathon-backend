// get games api

const express = require('express');
let router = express.Router();
const {gameDB} = require("../models/Games.js");
const _ = require('lodash');

router.get('/search', async (req, res) => {
    const resp = await gameDB.find({}).lean();
    res.send({
        games: _.map(resp, (x) => {
            return {...x, game_url: "http://www.snut.fr/wp-content/uploads/2015/08/image-de-paysage.jpg"};
        })
    });
});

module.exports = router;