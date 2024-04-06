const mongoose = require("mongoose");
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
      coordinates: [-73.856077, 40.848447]
}
    },
  },
  { timestamps: true }
);




/**
 * Helper method for getting user's gravatar.
 */
// userSchema.methods.gravatar = function gravatar(size) {
//   if (!size) {
//     size = 200;
//   }
//   if (!this.email) {
//     return `https://gravatar.com/avatar/00000000000000000000000000000000?s=${size}&d=retro`;
//   }
//   const md5 = crypto.createHash("md5").update(this.email).digest("hex");
//   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
