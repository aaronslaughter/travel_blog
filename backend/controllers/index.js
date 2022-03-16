const ObjectId = require('mongoose').Types.ObjectId
const { BlogPost, Comment, Reply } = require('../models')

const validateKey = async (req, res) => {
  try {
    if (req.query.api_key === process.env.API_KEY) {
      return res.status(200).json({ validated: true })
    } else {
      return res.status(200).json({ validated: false })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const createBlogPost = async (req, res) => {
  try {

    if (req.query.api_key !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized'})
    }

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

    if (ObjectId.isValid(id)) {
      const blogPost = await BlogPost.findById(id)

      if (blogPost) {
        blogPost.comments = blogPost.comments.filter((element) => element.hidden === false)

        blogPost.comments.forEach((comment) => {
          comment.replies = comment.replies.filter((element) => element.hidden === false)
        })

        blogPost.comments.reverse()

        return res.status(200).json({ blogPost })
      } else {
        res.status(404).json({ error: 'Blog Post not found.'})
      }
    } else {
      return res.status(404).json({ error: 'Blog Post not found.' })
    }

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

const getAllSummarizedBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().select('-comments')

    return res.status(200).json({ blogPosts })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const hideBlogPost = async (req,res) => {
  try {

    if (req.query.api_key !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized'})
    }

    const { id } = req.params

    if (ObjectId.isValid(id)) {
      const blogPostExists = await BlogPost.exists({ _id: id })

      console.log(blogPostExists);

      if (blogPostExists) {
        const blogPost = await BlogPost.findByIdAndUpdate(id, { $set: { hidden: true } }, { new: true })
        return res.status(200).json(blogPost)
      } else {
        return res.status(404).json({ error: 'Blog Post not found.'})
      }
    } else {
      return res.status(404).json({ error: 'Blog Post not found.' })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const showBlogPost = async (req,res) => {
  try {

    if (req.query.api_key !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized'})
    }

    const { id } = req.params

    if (ObjectId.isValid(id)) {

      const blogPostExists = await BlogPost.exists({ _id: id })

      if (blogPostExists) {
        const blogPost = await BlogPost.findByIdAndUpdate(id, { $set: { hidden: false } }, { new: true })
        return res.status(200).json(blogPost)
      } else {
        return res.status(404).send({ message: 'Blog Post not found.' })
      }

    } else {
      return res.status(404).json({message: 'Blog Post not found.'})
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const comment = await new Comment(req.body)

    if (ObjectId.isValid(id)) {
      const blogPostExists = await BlogPost.exists({ _id: id })

      if (blogPostExists) {
        const blogPost = await BlogPost.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
        return res.status(200).json(blogPost)
      } else {
        return res.status(404).send({ message: 'Blog Post not found.' })
      }

    } else {
      return res.status(404).send({ message: 'Blog Post not found.' })
    }
    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const addReply = async (req, res) => {
  try {
    const { id } = req.params
    const reply = await new Reply(req.body)

    if (ObjectId.isValid(id)) {

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
        return res.status(404).send({ message: 'Comment not found.'})
      }

    } else {
      return res.status(404).send({ message: 'Comment not found.' })
    }

    
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const reportComment = async (req, res) => {
  try {
    const { id } = req.params

    if (ObjectId.isValid(id)) {
      
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
        return res.status(404).send({ message: 'Comment not found' })
      }
      
    } else {
      return res.status(404).json({ message: 'Comment not found.' })
    }


  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const unreportComment = async (req, res) => {
  try {

    if (req.query.api_key !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized'})
    }

    const { id } = req.params

    if (ObjectId.isValid(id)) {
      
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
            'comments.$.reported': false 
          } 
        }, { 
          new: true 
        })

        return res.status(200).send(blogPost)

      } else {
        return res.status(404).send({ message: 'Comment not found' })
      }
      
    } else {
      return res.status(404).json({ message: 'Comment not found.' })
    }


  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


const reportReply = async (req, res) => {
  try {
    const { id } = req.params

    if (ObjectId.isValid(id)) {

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
        return res.status(404).send({ message: 'Reply not found' })
      }

    } else {
      return res.status(404).json({ message: 'Reply not Found.'})
    }


  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const unreportReply = async (req, res) => {
  try {

    if (req.query.api_key !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized'})
    }

    const { id } = req.params

    if (ObjectId.isValid(id)) {

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
            [reportedKey]: false 
          } 
        })
  
        return res.status(200).send(updatedBlogPost)
      } else {
        return res.status(404).send({ message: 'Reply not found' })
      }

    } else {
      return res.status(404).json({ message: 'Reply not Found.'})
    }


  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const hideComment = async (req, res) => {
  try {

    if (req.query.api_key !== process.env.API_KEY) {
      return res.status(401).json({ message: 'Unauthorized'})
    }

    const { id } = req.params

    if (ObjectId.isValid(id)) {

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
        return res.status(404).send({ message: 'Comment not found' })
      }

    } else {
      return res.status(404).json({ message: 'Comment not Found.'})
    }


  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const hideReply = async (req, res) => {
  try {
    const { id } = req.params

    if (ObjectId.isValid(id)) {

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
        return res.status(404).send({ messsage: 'Reply not found' })
      }
    } else {
      return res.status(404).send({ message: 'Reply not found' })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getReportedComments = async (req, res) => {
  try {

    const blogPosts = await BlogPost.find()
    
    const reportedComments = []
    
    // for each blog post, filter for comments that are reported but not hidden
    // then spread operator push them on the array
    blogPosts.forEach((blogPost) => {
      reportedComments.push(...blogPost.comments.filter((comment) => comment.hidden === false && comment.reported === true))
    })

    return res.status(200).json(reportedComments)

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getReportedReplies = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find()

    const reportedReplies = []
    
    // for each comment, filter for replies that are reported but not hidden
    // then spread operator push them on the array
    blogPosts.forEach((blogPost) => {
      blogPost.comments.forEach((comment) => {
        reportedReplies.push(...comment.replies.filter((reply) => reply.hidden === false && reply.reported === true))
      })
    })

    return res.status(200).json(reportedReplies)

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  validateKey,
  createBlogPost,
  getBlogPostById,
  getSummarizedActiveBlogPosts,
  getAllSummarizedBlogPosts,
  hideBlogPost,
  showBlogPost,
  addComment,
  addReply,
  reportComment,
  unreportComment,
  reportReply,
  unreportReply,
  hideComment,
  hideReply,
  getReportedComments,
  getReportedReplies
}
