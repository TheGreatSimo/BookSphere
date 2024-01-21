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

  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    console.log("he is saved")

    try {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const {password: hashPassword , ...rest} = newUser._doc
        const expiryDate = new Date(Date.now() + 36000000)
        res.cookie('usertoken', token, { httpOnly : true , expires: expiryDate, secure: true  }).status(200).json(rest)
        console.log("done like a king")
    } catch (error) {
        next(error);

  }} catch (error) {
    next(error)
    
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


export const google = async (req, res, next) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour

      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);

    } else {

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          (Math.random() * 1000).toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const {password: hashPassword , ...rest} = newUser._doc
      const expiryDate = new Date(Date.now() + 3600000);       res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
