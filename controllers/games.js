// get games api

const express = require('express');
let router = express.Router();
const {findGamesByIds} = require("../models/Games.js");
const _ = require('lodash');
const {skillInterestsDB} = require("../models/SkillInterest");

router.post('/play', (req, res) => {
    res.send("OK");
})

router.post('/search', async (req, res) => {
    const username = _.get(req, 'body.username');
    const userId = username.toString();
    // todo: add redirect url
    const skillOrdered = await skillInterestsDB.aggregate([
        {
            '$match': {
                'userId': '1'
            }
        }, {
            '$addFields': {
                'convertedSkill': {
                    '$convert': {
                        'input': '$skillScore',
                        'to': 'decimal'
                    }
                },
                'convertedInterest': {
                    '$convert': {
                        'input': '$interestLevel',
                        'to': 'decimal'
                    }
                }
            }
        }, {
            '$group': {
                '_id': '$gameId',
                'avgSkillScore': {
                    '$avg': '$convertedSkill'
                },
                'avgInterestLevel': {
                    '$avg': '$convertedInterest'
                }
            }
        }, {
            '$sort': {
                'avgSkillScore': -1,
                'avgInterestLevel': -1
            }
        }
    ]);
    const ids = skillOrdered.map((x) => x._id);
    const resp = await findGamesByIds(ids);
    res.send({
        games: _.map(resp, (x) => {
            return {...x, game_url: "http://www.snut.fr/wp-content/uploads/2015/08/image-de-paysage.jpg", redirect_url: "https://49d3-167-220-238-235.ngrok-free.app/"};
        })
    });
});

module.exports = router;