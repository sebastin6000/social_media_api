import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//  REGISTER USER
export const register = async (request, response) => {
  try {
    // inorder to register a user we have to extract the
    // imformation from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = request.body;

    // here we are creating a random salt provided by bcrypt for password hashing
    const salt = await bcrypt.genSalt();
    // the below code is password hassing inorder to encrypt the password
    const passwordHash = await bcrypt.hash(password, salt);

    // the below code is for creating a newUser
    // the way the encrypt function works is
    // we first encrypt the password and save it
    // and when the user tries to login we going to salt the password
    // and we are sending a json web token
    // and in each route we are validing the jsonwebtoken
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // this value is a random value
      impression: Math.floor(Math.random() * 10000), // this value is a random value
    });

    // here we are saving the newUser in the Database
    const savedUser = await newUser.save();

    // here in the below code we are sending the new user in responce
    response.status(201).json(savedUser); // 201 status code is for indication something is created
  } catch (error) {
    // in the below code we are sending the error the mongodb gives 
    response.status(404).json({ error: error.message });
  }
};
