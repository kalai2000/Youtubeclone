import Channel from "../models/channel.js";
import mongoose from "mongoose";
import User from "../models/User.js";

//   Create Channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    const userId = req.user._id; // _id due to mongodb

    const newChannel = new Channel({
      channelName,
      owner: userId,
      description,
      channelBanner,
    });

    const savedChannel = await newChannel.save();

    await User.findByIdAndUpdate(userId, { channelId: savedChannel._id }, { new: true });

    res.status(201).json(savedChannel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//   Get Channel
export const getChannel = async (req, res) => {
  try {
    const channelIdObject = new mongoose.Types.ObjectId(req.params.channelId);
    const channel = await Channel.findById(channelIdObject);
    if (!channel) return res.status(404).json({ error: "Channel not found" });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 

//   Add Video to Channel
export const addVideoToChannel = async (req, res) => {
  try {
    const { videoId } = req.body;
    const channelIdObject = new mongoose.Types.ObjectId(req.params.channelId);

    const channel = await Channel.findById(channelIdObject);
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    channel.videos.push(videoId);
    await channel.save();

    res.json({ message: "Video added to channel", channel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Upload Banner
export const uploadBanner = async (req, res) => {
  try {
    const userId = req.user._id;
    const channel = await Channel.findOne({ owner: userId });
    if (!channel) return res.status(404).json("Channel not found");

    channel.channelBanner = req.file.filename;
    await channel.save();

    res.status(200).json({ message: "Banner uploaded", filename: req.file.filename });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json("Something went wrong while uploading banner");
  }
};
