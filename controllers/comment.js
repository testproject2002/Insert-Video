import createError from '../error.js'
import Comment from '../models/comment.js'
import Video from '../models/video.js'
export const addComment = async (req, res, next) => {
    try {
        const newComment = await new Comment({ userId: 2, ...req.body });
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        console.error("Error adding comment:", err);
        // Pass the error to the error handling middleware
        next(err);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) {
            return next(createError(404, 'Comment not found'))
        }
        
        const video = await Video.findById(comment.videoId)
        if (!video) {
            return next(createError(404, 'Video not found'))
        }
        
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json('Comment deleted successfully')
        } else {
            return next(createError(403, 'You can delete only your comment'))
        }
    } catch (err) {
        next(err)
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}
