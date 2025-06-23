import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  UserId: { 
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User", 
    required: true,
  },
  channelId: { 
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Channel", 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
  videourl: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],  
    default: [],
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],  
    default: [],
  },
}, { timestamps: true });

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);

export default Video;