import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      // the first name input field has these below properties
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      // the last name input field has these below properties
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      // the email input field has these below properties
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      // the password input field has these below properties
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number,
  },
  { timestamps: true }
);

// the below code is for creating a new user model
// with the user model we create new user documents
const User = new mongoose.model("User", userSchema);

export default User;
