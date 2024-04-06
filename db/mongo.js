const config = require('../config/config.json')
const mongoose = require('mongoose');
const uri = config.MONGO.URI
const options = config.MONGO.CONNECTION_OPTIONS

const dbConnection = mongoose.createConnection(process.env.MONGO_URI || uri + options);

module.exports = {
    dbConnection
}
