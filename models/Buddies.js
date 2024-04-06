const mongoose = require("mongoose");
const buddySchema = new mongoose.Schema(
  {
    buddy: {
        name: String,
        location: String
    }
  });

const Buddy = mongoose.model("Buddy", buddySchema);
module.exports = Buddy;