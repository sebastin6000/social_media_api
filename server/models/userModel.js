import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    // the first name input field has these below properties
    type: String,
    require: true,
    min: 2,
    max: 50,
  },
});
