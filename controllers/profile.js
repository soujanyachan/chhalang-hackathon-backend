const express = require("express");
let router = express.Router();
const { client } = require("../db/mongo");

const { updateLocation } = require("./location");

router.post("/create", async (req, res, next) => {
  console.log(req.body);
  const update = await client
    .db("gameskraft")
    .collection("profiles")
    .insertOne(req.body);
  console.log(update);
  res.send({
    success: true,
    message: "created profile",
    data: update,
  });
});

router.put("users/:userId/update/location", updateLocation);

router.post("/create", async (req, res, next) => {
  client;
});

module.exports = router;
