const mongoose = require("mongoose");
const { dbConnection } = require("../db/mongo");
const userSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    maxConnectionRadius: Number,
    friends: [String],
    profile: {
      name: String,
      default_location: String,
      phone: String,
    },
    userLocation: {
      location: {
        type: String,
        coordinates: [mongoose.Schema.Types.Decimal128],
      },
    },
  },
  { timestamps: true }
);

let userDB = dbConnection.model("users", userSchema);

const getIdFromUserName = async (username) => {
  return userDB.find({ username });
};

const addFriendsToUser = async () => {

};

const deleteFriendsFromUser = async () => {

const updateFriendsForUser = async ({ fromUserId, toUserId }) => {};

module.exports = {userDB, getIdFromUserName, deleteFriendsFromUser, addFriendsToUser};
