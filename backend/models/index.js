const mongoose = require('mongoose')
const BlogPostSchema = require('./blogPost')

const BlogPost = mongoose.model('blogPosts', BlogPostSchema)

module.exports = {
  BlogPost,
}
