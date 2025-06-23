 
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "",  
  },
  subscribedChannels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",  
    }
  ],
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",  
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", UserSchema);
