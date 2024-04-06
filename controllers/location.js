const {UserDB} = require('../models/User')
exports.getLocation = async (req, res) => {
    try {
        const {userId} = req.params;
        const {latitude, longitude} = req.body;
        const user = await UserDB.find({id: userId});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        // Update user's location
        user.userLocation = {
            type: "Point",
            coordinates: [longitude, latitude]
        };
        await user.save();
        res.status(200).json({message: "User location updated successfully"});
    } catch (error) {
        console.error("Error updating user location:", error);
        res.status(500).json({error: "Internal server error"});

    }
};