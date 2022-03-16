import React from 'react'
import AdminCreateBlogPostView from './AdminCreateBlogPostView'
import { useState } from 'react'
import { CreateBlogPost } from '../../services/BlogServices'

const AdminCreateBlogPostController = ( {passwordInput} ) => {

  const [newBlogPost, setNewBlogPost] = useState({title: '', imageUrl: '', body: ''})
  const [isOpen, toggleIsOpen] = useState(false)
  const [submitAttempt, toggleSubmitAttempt] = useState(false)

  const handleSubmit = async (e) => {

    if (newBlogPost.title.length > 0 &&
        newBlogPost.imageUrl.length > 0 &&
        newBlogPost.body.length > 0) {

      await CreateBlogPost(newBlogPost, passwordInput)
      toggleIsOpen(false)
      resetDataFields()

    } else {
      toggleSubmitAttempt(true)
    }
  }

  const handleChange = (e) => {
    setNewBlogPost({...newBlogPost, [e.target.name]: e.target.value})
  }

  const resetDataFields = () => {
    setNewBlogPost({title: '', imageUrl: '', body: ''})
    toggleSubmitAttempt(false)
  }

  return (
    <div>
      <AdminCreateBlogPostView
        newBlogPost={newBlogPost}
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        setNewBlogPost={setNewBlogPost}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        resetDataFields={resetDataFields}
        submitAttempt={submitAttempt}
      />
    </div>
  )
}

export default AdminCreateBlogPostController