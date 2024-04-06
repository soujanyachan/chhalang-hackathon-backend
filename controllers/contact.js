const UserDB = require("../models/User");
//create profile api
exports.CreateProfile = async (req, res) => {
  const users = req.body;
};

//get buddy api

exports.findBuddies = async (req, res) => {
  try {
    const { userId, gameId, latitude, longitude } = req.body;
    // Find the user's buddies
    const user = await UserDB.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Query for potential buddies based on gameId and location
    const potentialBuddies = await UserDB.aggregate([
      // Match users with the given gameId
      { $match: { gameId } },

      // Exclude the current user
      { $match: { _id: { $ne: user._id } } },

      // Add distance calculation based on location
      {
        $addFields: {
          distance: {
            $sqrt: {
              $add: [
                {
                  $pow: [
                    { $subtract: ["$userLocation.coordinates.0", longitude] },
                    2,
                  ],
                },
                {
                  $pow: [
                    { $subtract: ["$userLocation.coordinates.1", latitude] },
                    2,
                  ],
                },
              ],
            },
          },
        },
      },

      // Sort by distance
      { $sort: { distance: 1 } },

      // Limit the number of results if needed
      { $limit: 10 },
    ]);

    res.status(200).json({ buddies: potentialBuddies });
  } catch (error) {
    console.error("Error finding buddies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
