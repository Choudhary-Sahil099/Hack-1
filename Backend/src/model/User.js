import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  state: String,
  district: String,

  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: String,
  otpExpiry: Date,

  resetPasswordToken: String,
});

export default mongoose.model("User", userSchema);