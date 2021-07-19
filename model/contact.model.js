const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"]
    },
    email: {
      type: String,
      required: [true, "Set email for contact"]
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"]
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

const ContactModel = mongoose.model("Contact", contactSchema);

exports.ContactModel = ContactModel;
