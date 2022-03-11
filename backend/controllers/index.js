const { BlogPost, Comment, Reply } = require('../models')

const createBlogPost = async (req, res) => {
  try {
    const blogPost = await new BlogPost(req.body)
    await blogPost.save()

    return res.status(201).json({ blogPost })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params
    const blogPost = await BlogPost.findById(id)

    return res.status(200).json({ blogPost })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getSummarizedActiveBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({ hidden: false }).select('-comments')

      return res.status(200).json({ blogPosts })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const comment = await new Comment(req.body)

    const blogPostExists = await BlogPost.exists({ _id: id })

    if (blogPostExists) {
      const blogPost = await BlogPost.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
      return res.status(200).json(blogPost)
    } else {
      return res.status(404).send('Blog Post not found.')
    }
    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const addReply = async (req, res) => {
  try {
    const { id } = req.params
    const reply = await new Reply(req.body)

    const commentExists = await BlogPost.exists({ comments: { $elemMatch: { _id: id } } })

    if (commentExists) {
      const blogPost = await BlogPost.findOneAndUpdate({ 
        comments: { 
          $elemMatch: { 
            _id: id 
          } 
        } 
      }, { 
        $push: { 
          'comments.$.replies': reply 
        } 
      }, { 
        new: true 
      })

      return res.status(200).send(blogPost)

    } else {
      return res.status(404).send('Comment not found.')
    }
    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const reportComment = async (req, res) => {
  try {
    const { id } = req.params

    const commentExists = await BlogPost.exists({ comments: { $elemMatch: { _id: id } } })

    if (commentExists) {
      const blogPost = await BlogPost.findOneAndUpdate({ 
        comments: { 
          $elemMatch: { 
            _id: id 
          } 
        } 
      }, { 
        $set: { 
          'comments.$.reported': true 
        } 
      }, { 
        new: true 
      })
      return res.status(200).send(blogPost)
    } else {
      return res.status(404).send('Comment not found')
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const reportReply = async (req, res) => {
  try {
    const { id } = req.params

    const replyExists = await BlogPost.exists({ comments: { $elemMatch: { replies: {$elemMatch: { _id: id } } } } })

    if (replyExists) {

      const blogPost = await BlogPost.findOne({ comments: { $elemMatch: { replies: {$elemMatch: { _id: id } } } } })

      // MongoDB does not support the positional $ operator on doubly nested arrays
      // the exact indices must be used in this case and are passed to the update method as [reportedKey]
      let commentIndex
      let replyIndex

      for (let i = 0; i < blogPost.comments.length; i++) {
        for (let j = 0; j < blogPost.comments[i].replies.length; j++) {
          if (blogPost.comments[i].replies[j]._id.toString() === id) {
            commentIndex = i
            replyIndex = j
          }
        }
      }

      const reportedKey = `comments.${commentIndex}.replies.${replyIndex}.reported`

      const updatedBlogPost = await BlogPost.findOneAndUpdate({ 
        comments: { 
          $elemMatch: { 
            replies: { 
              $elemMatch: { 
                _id: id 
              } 
            } 
          } 
        } 
      }, { 
        $set: { 
          [reportedKey]: true 
        } 
      })

      return res.status(200).send(updatedBlogPost)
    } else {
      return res.status(404).send('Reply not found')
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const hideComment = async (req, res) => {
  try {
    const { id } = req.params

    const commentExists = await BlogPost.exists({ comments: { $elemMatch: { _id: id } } })

    if (commentExists) {
      const blogPost = await BlogPost.findOneAndUpdate({ 
        comments: { 
          $elemMatch: { 
            _id: id 
          } 
        } 
      }, { 
        $set: { 
          'comments.$.hidden': true 
        } 
      }, { 
        new: true 
      })
      return res.status(200).send(blogPost)
    } else {
      return res.status(404).send('Comment not found')
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const hideReply = async (req, res) => {
  try {
    const { id } = req.params

    const replyExists = await BlogPost.exists({ comments: { $elemMatch: { replies: {$elemMatch: { _id: id } } } } })

    if (replyExists) {

      const blogPost = await BlogPost.findOne({ comments: { $elemMatch: { replies: {$elemMatch: { _id: id } } } } })

      // MongoDB does not support the positional $ operator on doubly nested arrays
      // the exact indices must be used in this case and are passed to the update method as [reportedKey]
      let commentIndex
      let replyIndex

      for (let i = 0; i < blogPost.comments.length; i++) {
        for (let j = 0; j < blogPost.comments[i].replies.length; j++) {
          if (blogPost.comments[i].replies[j]._id.toString() === id) {
            commentIndex = i
            replyIndex = j
          }
        }
      }

      const reportedKey = `comments.${commentIndex}.replies.${replyIndex}.hidden`

      const updatedBlogPost = await BlogPost.findOneAndUpdate({ 
        comments: { 
          $elemMatch: { 
            replies: { 
              $elemMatch: { 
                _id: id 
              } 
            } 
          } 
        } 
      }, { 
        $set: { 
          [reportedKey]: true 
        } 
      })

      return res.status(200).send(updatedBlogPost)
    } else {
      return res.status(404).send('Reply not found')
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}




module.exports = {
  createBlogPost,
  getBlogPostById,
  getSummarizedActiveBlogPosts,
  addComment,
  addReply,
  reportComment,
  reportReply,
  hideComment,
  hideReply
}
