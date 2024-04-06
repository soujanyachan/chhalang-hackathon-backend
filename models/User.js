const mongoose = require("mongoose");
const {dbConnection} = require('../db/mongo');
const userSchema = new mongoose.Schema(
    {
        userId: String,
        username: String,
        maxConnectionRadius: Number,
        profile: {
            name: String,
            location: String,
            website: String,
            picture: String,
        },
        userLocation: {
            location: {
                type: String,
                coordinates: [mongoose.Schema.Types.Decimal128]
            }
        },
    },
    {timestamps: true}
);

let userDB = dbConnection.model('users', userSchema);

module.exports = {userDB};
