import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username , email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    console.log("done like a king ");
    res.status(201).json({
      message: `Yeah you've done like a king`,
    });
  } catch (error) {
        next(error)
  }
};
