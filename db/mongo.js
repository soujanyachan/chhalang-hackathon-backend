const config = require('../config/config.json')
const mongoose = require('mongoose');
const uri = config.MONGO.URI
const options = config.MONGO.CONNECTION_OPTIONS

const dbConnection = mongoose.createConnection(uri + options);

module.exports = {
    dbConnection
}
