const { userDB } = require("../models/User");
const _ = require("lodash");
exports.updateLocation = async (req, res) => {
  try {
    const { userId } = req.params;

    const { latitude, longitude } = req.body;
    const user = await userDB.find({ userId });
    if (_.isEmpty(user)) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update user's location

    user.userLocation = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    // await user.save();
    res.status(200).json({ message: "User location updated successfully" });
  } catch (error) {
    console.error("Error updating user location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
