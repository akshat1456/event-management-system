const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  date: { type: String, required: true, trim: true, maxlength: 80 },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, required: true, trim: true, maxlength: 80 },
});

// Preserve the EventHub frontend's event.id property while exposing MongoDB _id.
eventSchema.set("toJSON", {
  transform: (_doc, result) => {
    result.id = result._id.toString();
    delete result.__v;
    return result;
  },
});

module.exports = mongoose.model("Event", eventSchema);
