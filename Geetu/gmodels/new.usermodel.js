import mongoose from "mongoose";

const newuserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  mobile: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("NewUser", newuserSchema);
