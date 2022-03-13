const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplySchema = new Schema(
  {
    username: String,
    body: String,
    reported: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const CommentSchema = new Schema(
  {
    username: String,
    body: String,
    replies: [ReplySchema],
    reported: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const BlogPostSchema = new Schema(
  {
    version: { type: Number, default: 1 },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    body: { type: String, required: true },
    comments: [CommentSchema],
    hidden: { type: Boolean, default: false },
    hasExtras: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = {
  BlogPostSchema,
  CommentSchema,
  ReplySchema
}
