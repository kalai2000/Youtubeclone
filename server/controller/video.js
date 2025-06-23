  
import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import Channel from "../models/channel.js";

 

// addvideo
export const addVideo = async (req, res, next) => {
  try {
    

    const { title, desc, tags } = req.body;
    const channelId = req.user.channelId; 

    //   Validate Required Fields
    if (!channelId) return next(createError(400, "Channel ID is required"));
    if (!title || !desc) return next(createError(400, "Title and Description are required"));
    if (!req.files?.video?.[0] || !req.files?.img?.[0]) return next(createError(400, "Video and Image files are required"));

    //   Ensure video is linked correctly
    const newVideo = new Video({
      UserId: req.user._id, 
      channelId,
      title,
      desc,
      imgurl: req.files.img[0].path,
      videourl: req.files.video[0].path,
      tags: Array.isArray(tags) ? tags : tags?.split(",") || [], // Ensure tags are an array
    });

    const savedVideo = await newVideo.save();

    //   Verify Channel Exists Before Updating
    const channelExists = await Channel.findById(channelId);
    if (!channelExists) return next(createError(404, "Channel not found"));

    await Channel.findByIdAndUpdate(channelId, { $push: { videos: savedVideo._id } });

 
    res.status(201).json(savedVideo);
  } catch (err) {
    
    next(err);
  }
};
//   Update a video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    if (req.user._id !== video.UserId.toString()) return next(createError(403, "You can update only your video"));

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedVideo);
  } catch (err) {
    next(err);
  }
};

//   Delete a video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    // Corrected field names and type-safe comparison
    if (req.user._id !== video.UserId.toString()) {
      return next(createError(403, "You can delete only your video"));
    }

    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json("Video deleted successfully");
  } catch (err) {
    next(err);
  }
};


//   Get a single video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

//   Increase view count
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json("The view count has been increased");
  } catch (err) {
    next(err);
  }
};

//   Get all videos for a channel
export const getVideosByChannel = async (req, res, next) => {
  try {
    const videos = await Video.find({ channelId: req.params.channelId });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//   Get videos uploaded by a user (for their channel)
export const getVideosByUser = async (req, res, next) => {
  try {
    if (!req.user.channelId) return next(createError(400, "User has no associated channel"));
    const videos = await Video.find({ channelId: req.user.channelId });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//   Get random videos
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//   Get trending videos
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//   Get subscribed channel videos
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found"));

    const subscribedChannels = user.subscribedUsers || [];

    const videos = await Video.find({ channelId: { $in: subscribedChannels } }).sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//   Get videos by tags
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags?.split(",") || [];
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

//   Search videos by title
export const search = async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) return next(createError(400, "Search query missing"));

    const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};