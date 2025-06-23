import { createError } from "../error.js";
import Comment from "../models/comments.js";  

// Add a comment
export const addComment = async (req, res, next) => {
 

  try {
    const newComment = new Comment({ ...req.body, userId: req.user._id });  // _id as stored in mongodb as like that 
    

    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    console.error("Error saving comment:", err);
    next(err);
  }
};

// Edit a comment
export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found"));

     
    if (comment.userId.toString() !== req.user._id) {
      return next(createError(403, "You can update only your own comment"));
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
};

 
// Delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return next(createError(404, "Comment not found"));

    // ✅ Compare stringified IDs
    if (comment.userId.toString() !== req.user._id.toString()) {
      return next(createError(403, "You can only delete your own comment"));
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("The comment has been deleted");
  } catch (err) {
    next(err);
  }
};



// Get comments for a video
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId })
      .populate("userId", "name img");  

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

