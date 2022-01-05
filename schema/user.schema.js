const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  createtime: {
    type: Date,
    default: Date.now,
  },
})

userSchema.set("collection", "user")

const User = mongoose.model("user", userSchema)

module.exports = User
