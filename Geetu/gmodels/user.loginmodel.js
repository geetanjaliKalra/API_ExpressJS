import mongoose from "mongoose";

const loginUserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
});

export default mongoose.model("LoginUser", loginUserSchema);
