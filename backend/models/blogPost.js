const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPost = new Schema(
  {
    version: { type: Number, default: 1 },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    body: { type: String, required: true },
    comments: [{
      username: String,
      body: String,
      date: Date,
      reported: { type: Boolean, default: false },
      hidden: { type: Boolean, default: false },
      replies: [{
        username: String,
        body: String,
        date: Date,
        reported: { type: Boolean, default: false },
        hidden: { type: Boolean, default: false }
      }]
    }],
    hidden: { type: Boolean, default: false },
    hasExtras: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = BlogPost
