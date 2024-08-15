const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  number: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  password: { type: String, required: true },
  profilePicture: { type: String },
  joinDate: { type: Date, default: Date.now },
  sentFollowRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  receivedFollowRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
