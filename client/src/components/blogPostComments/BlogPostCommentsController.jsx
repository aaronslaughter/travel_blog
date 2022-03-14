import React from 'react'
import { useState, useEffect } from 'react'
import AddCommentView from '../addComment/AddCommentView'
import BlogPostCommentsView from './BlogPostCommentsView'
import { CreateComment, ReportComment } from '../../services/BlogServices'

const BlogPostCommentsController = ({ blogPostDetails, fetchBlogPostDetails }) => {
  
  const [newComment, setNewComment] = useState({ username: '', body: '' })
  const [submitAttempt, toggleSubmitAttempt] = useState(false)
  const [modalIsOpen, toggleModalIsOpen] = useState(false)
  const [comments, setComments] = useState(blogPostDetails.comments)

  useEffect(() => {
    resetShowReplies()
  }, [blogPostDetails])

  const handleSubmit = async () => {
    if (newComment.username.length > 0 &&
        newComment.body.length > 0) {

      await CreateComment(blogPostDetails._id, newComment)
      
      toggleModalIsOpen(false)
      resetCommentFields()
      fetchBlogPostDetails()
      resetShowReplies()

    } else {
      toggleSubmitAttempt(true)
    }
  }

  const handleReport = async (commentId) => {
    await ReportComment(commentId)
    fetchBlogPostDetails()
  }

  const handleChange = (e) => {
    setNewComment({...newComment, [e.target.name]: e.target.value})
  }
  
  const resetCommentFields = () => {
    setNewComment({username: '', body: ''})
    toggleSubmitAttempt(false)
  }

  const resetShowReplies = () => {
    blogPostDetails.comments.forEach((element) => element.showReplies = false)
    setComments(blogPostDetails.comments)
  }

  return (
    <div>
      <AddCommentView
        modalIsOpen={modalIsOpen}
        toggleModalIsOpen={toggleModalIsOpen}
        handleSubmit={handleSubmit}
        newComment={newComment}
        handleChange={handleChange}
        resetCommentFields={resetCommentFields}
        submitAttempt={submitAttempt}
      />
      <BlogPostCommentsView
        comments={comments}
        fetchBlogPostDetails={fetchBlogPostDetails}
        handleReport={handleReport}
      />
    </div>
  )
}

export default BlogPostCommentsController
