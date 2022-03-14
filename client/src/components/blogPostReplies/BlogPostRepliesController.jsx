import React from 'react'
import { useState, useEffect } from 'react'
import BlogPostRepliesView from './BlogPostRepliesView'
import AddReplyView from '../addReply/AddReplyView'
import { CreateReply, ReportReply } from '../../services/BlogServices'

const BlogPostRepliesController = ({ commentId, replies, fetchBlogPostDetails }) => {

  const [newReply, setNewReply] = useState({ username: '', body: '' })
  const [submitAttempt, toggleSubmitAttempt] = useState(false)
  const [modalIsOpen, toggleModalIsOpen] = useState(false)

  const handleSubmit = async () => {

    if (newReply.username.length > 0 &&
        newReply.body.length > 0) {

      await CreateReply(commentId, newReply)

      toggleModalIsOpen(false)
      resetReplyFields()
      fetchBlogPostDetails()
    
    } else {
      toggleSubmitAttempt(true)
    }
  }

  const handleReport = async (replyId) => {
    await ReportReply(replyId)
    fetchBlogPostDetails()
  }

  const handleChange = (e) => {
    setNewReply({...newReply, [e.target.name]: e.target.value})
  }
  
  const resetReplyFields = () => {
    setNewReply({username: '', body: ''})
    toggleSubmitAttempt(false)
  }

  return (
    <div>
      <BlogPostRepliesView
        replies={replies}
        handleReport={handleReport}
      />
      <AddReplyView
        modalIsOpen={modalIsOpen}
        toggleModalIsOpen={toggleModalIsOpen}
        handleSubmit={handleSubmit}
        newReply={newReply}
        handleChange={handleChange}
        resetReplyFields={resetReplyFields}
        submitAttempt={submitAttempt}
      />
      
    </div>
  )
}

export default BlogPostRepliesController
