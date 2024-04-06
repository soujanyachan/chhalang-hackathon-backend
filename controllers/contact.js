const {userDB, getIdFromUserName} = require("../models/User");
const {skillInterestsDB} = require("../models/SkillInterest");
//get buddy api

exports.findBuddies = async (req, res) => {
  try {
    const { username, gameId, latitude, longitude } = req.body;
    // Find the user's buddies
    const userId = await getIdFromUserName(username);
    const user = await userDB.find({userId});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Query for potential buddies based on gameId and location
    const pipeline = [
      // Match users with the given gameId

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
    ];
    if (gameId) {
      pipeline.unshift({ $match: { gameId } })
    }
    const potentialBuddies = await userDB.aggregate(pipeline);

    res.status(200).json({ buddies: potentialBuddies });
  } catch (error) {
    console.error("Error finding buddies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
