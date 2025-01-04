const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ["instructor", "student"], required: true },
  profile_data: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: false },
    bio: { type: String, required: false },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
