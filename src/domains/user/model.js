const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  enroll: String,
  lastLogin: { type: Date, default: Date.now() },
  token: String,
});
const User = mongoose.model("UserRegistrations", userSchema);
module.exports = User;
