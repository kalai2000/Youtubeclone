import User from "../models/User.js";   
import Video from "../models/Video.js";  
import Channel from "../models/channel.js";
import { createError } from "../error.js";


//update user
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },  
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};


// delete user
export const deleteuser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account"));
  }
};




// getuser
export const getuser = async (req, res, next) => {
  
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};



// subscribe to user
export const subscribe = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) return next(createError(404, "Channel not found"));

    // Add channel to user's subscribed list
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { subscribedChannels: req.params.id },
    });

    // Increment channel's subscriber count
    await Channel.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    res.status(200).json("Subscribed to channel");
  } catch (err) {
    next(err);
  }
};



// unsubscribe to user 
export const unsubscribe = async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) return next(createError(404, "Channel not found"));

    // Remove channel from user's subscribed list
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedChannels: req.params.id },
    });

    // Decrement channel's subscriber count
    await Channel.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("Unsubscribed from channel");
  } catch (err) {
    next(err);
  }
};




export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoid;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoid;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    next(err);
  }
};
