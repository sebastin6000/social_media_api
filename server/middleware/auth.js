import jwt from "jsonwebtoken";

export const verifyToken = async (request, responce, next) => {
  try {
    // here we are grabing the authorization header
    let token = request.body("Authorization");

    // if there is no token we then sending access denied message
    if (!token) {
      return responce.status(403).json({ message: "Access Denied" });
    }

    // here we are grabing the token from authorization header with the start of beared token
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // here we are verifing the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    request.user = verified;

    // calling the next function
    next();
  } catch (error) {
    responce.status(500).json({ messege: error.messege });
  }
};
