import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelId: { type: String, required: true, unique: true },
  channelName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  
  description: { type: String },
  channelBanner: { type: String },
  subscribers: { type: Number, default: 0 },
  videos: [{ type: String }],
}, { timestamps: true });

//   Check if the model already exists before defining
const Channel = mongoose.models.Channel || mongoose.model("Channel", channelSchema);

export default Channel;
