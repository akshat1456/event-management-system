const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

// Never include password hashes in API JSON.
userSchema.set("toJSON", {
  transform: (_document, result) => {
    delete result.password;
    delete result.__v;
    result.id = result._id.toString();
    return result;
  },
});

module.exports = mongoose.model("User", userSchema);
