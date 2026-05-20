const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  gender: { type: String, required: true },
  contactNumber: {
    type: String,
    required: true,
    match: /^09\d{9}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "editor",
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  address: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports =
  mongoose.model.userSchema || mongoose.model("User", userSchema);
