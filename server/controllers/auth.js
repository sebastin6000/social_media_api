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

// LOGGING IN USER
export const login = async (request, responce) => {
  try {
    // we are getting the user detail from the request body
    const { email, password } = request.body;
    // we are checking our database for the given email address
    const user = await User.findOne({ eamil: email });
    // after then we have to check that the user given email address available in our database
    // if there is no user with this email we are user does not exist message
    if (!user)
      return responce.status(400).json({ message: "User does not exits" });
    // then we have compare user given normal password with hassed password
    const isMatched = await bcrypt.compare(password, user.password);
    // then we have to check
    if (!isMatched)
      return responce.status(400).json({ message: "Invalid Creditionls" });
    //then we have to issue a json token
    const token = jwt.sign({ id: user.__id }, process.env.JWT_SECRET);
    // after then we have to delete the password inorder to not send to front end
    delete User.password;
    // after then we sending the responce to the client
    responce.status(200).json({ token, user });
  } catch (error) {
    // we are sending error responce if we get any error
    responce.status(500).json({ error: error.message });
  }
};
