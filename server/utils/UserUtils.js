import jwt from "jsonwebtoken";
import User from "../models/User.js";
const secret = "secret";

export const getUserFromToken = async (token) => {
    const userFromToken = jwt.verify(token, secret);
    try {
      const user = await User.findById(userFromToken.id);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

