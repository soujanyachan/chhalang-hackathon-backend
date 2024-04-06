const express = require('express');
let router = express.Router();
const {client} = require('../db/mongo');

router.post('/create', async (req, res, next) => {
    client
})
router.post('/update', async (req, res, next) => {})