import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    minLength: [3, "Name must contain at least 3 Characters"],
  },
  subject: {
    type: String,
    minLength: [3, "subject must contain at least 3 Characters"],
  },
  message: {
    type: String,
    minLength: [3, "messsage must contain at least 3 Characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Message = mongoose.model("Message", messageSchema);
