const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  username: String,
  isBot: Boolean,
  languageCode: String,
  ban: { type: Object, default: {} },
  settings: { type: Object, default: {} },
  avatarUrl: String,
  exp: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now() },
});

const User = model("User", userSchema);

module.exports = User;
