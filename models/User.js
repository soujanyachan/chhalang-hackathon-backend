const mongoose = require("mongoose");
const {client} = require('../db/mongo');

const userSchema = new mongoose.Schema(
    {
        profile: {
            name: String,
            location: String,
            website: String,
            picture: String,
        },
        userLocation: {
            location: {
                type: "Point",
                coordinates: [mongoose.Schema.Types.Decimal128]
            }
        },
    },
    {timestamps: true}
);

let UserDB = client.db('gameskraft').collection('users').model('User', userSchema);

module.exports = UserDB;
