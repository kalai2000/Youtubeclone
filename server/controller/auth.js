 
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

// SIGNUP Controller
 
import Channel from "../models/channel.js";
 
 

export const signup = async (req, res) => {
  try {
    // Step 1: Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Step 2: Handle image if uploaded
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    // Step 3: Create the new user (without channelId yet)
    const newUser = new User({
      ...req.body,
      password: hash,
      img: imagePath,
    });

    const savedUser = await newUser.save();

    // Step 4: Create the channel
    const newChannel = new Channel({
      channelName: `${savedUser.name}'s Channel`,
      owner: savedUser._id,
      description: `Welcome to ${savedUser.name}'s channel!`,
      channelBanner: "",
    });

    //  Assign the channelId field before saving
    newChannel.channelId = newChannel._id.toString();

    const savedChannel = await newChannel.save();

    // Step 5: Link channelId to user
    savedUser.channelId = savedChannel._id;
    await savedUser.save();

    // Step 6: Generate JWT
    const token = jwt.sign(
      { id: savedUser._id, channelId: savedChannel._id },
      process.env.JWT_SECRET
    );

    // Step 7: Exclude password from response
    const { password, ...others } = savedUser._doc;

    // Step 8: Send response
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (err) {
     
    return res.status(500).json({
      error: err.message || "Signup failed due to server error",
    });
  }
};


// SIGNIN Controller
export const signin = async (req, res, next) => {
   

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong credentials"));

    const token = jwt.sign(
      { id: user._id, channelId: user.channelId },
      process.env.JWT_SECRET
    );

    const { password, ...others } = user._doc;

     

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...others, channelId: user.channelId });  
  } catch (err) {
    next(err);
  }
};
