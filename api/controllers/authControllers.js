import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

try {
  const jwtSecret = process.env.JWT_SECRET; 
  console.log(`Ok go the jew secret key ${jwtSecret}`)
} catch (error) {
  console.log("No jwt secret key bro")
}


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
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
      success: true,
      message: `Yeah you've done like a king`,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      return next(errorHandler(401, "Invalid user"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
    }


    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password: hashPassword , ...rest} = validUser._doc
    const expiryDate = new Date(Date.now() + 36000000)

    res.cookie('usertoken', token, { httpOnly : true , expires: expiryDate, secure: true  }).status(200).json(rest)
    // Both user and password are valid
    console.log("correct user and password");

  } catch (error) {
    console.log("Sorry, can't do it");
    next(error);
  }
};
