const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPost = new Schema(
  {
    version: 1,
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    body: { type: String, required: true },
    comments: [{
      username: String,
      body: String,
      reported: Boolean,
      hidden: Boolean,
      replies: [{
        username: String,
        body: String,
        reported: Boolean,
        hidden: Boolean
      }]
    }],
    hasExtras: Boolean,
  },
  { timestamps: true }
)

module.exports = BlogPost
