const mongoose = require('mongoose')
const { BlogPostSchema, CommentSchema, ReplySchema } = require('./blogPost')

const BlogPost = mongoose.model('blogPosts', BlogPostSchema)
const Comment = mongoose.model('comments', CommentSchema)
const Reply = mongoose.model('replies', ReplySchema)

module.exports = {
  BlogPost,
  Comment,
  Reply
}
