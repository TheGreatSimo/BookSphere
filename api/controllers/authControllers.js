import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password,10)

  const newUser = new User({
    username: name,
    email,
    password : hashPassword,
  });

  try {
    await newUser.save();
    console.log("done like a king ");
    res.status(201).json({
      message: `Yeah you've done like a king`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Sorry brother something is wrong here is the error ${error}`,
    });
  }
};
