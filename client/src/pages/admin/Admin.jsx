import React from 'react'
import { useState } from 'react'
import { ValidatePassword } from '../../services/BlogServices'
import AdminLogin from '../../components/adminLogin/AdminLogin'
import CreateBlogPostController from '../../components/createBlogPost/CreateBlogPostController'
import AdminBlogPostListController from '../../components/adminBlogPostList/AdminBlogPostListController'
import AdminHideCommentsController from '../../components/adminHideComments/AdminHideCommentsController'
import AdminHideRepliesController from '../../components/adminHideReplies/AdminHideRepliesController'

const Admin = () => {

  const [passwordInput, setPasswordInput] = useState('')
  const [loggedIn, toggleLoggedIn] = useState(false)
  const [submitAttempt, toggleSubmitAttempt] = useState(false)

  const handleSubmit = async () => {

    const validated = await ValidatePassword(passwordInput)

    if (validated) {
      toggleLoggedIn(true)
      toggleSubmitAttempt(false)
    } else {
      toggleSubmitAttempt(true)
      setPasswordInput('')
    }

  }
  
  const handleChange = (e) => {
    setPasswordInput(e.target.value)
  }

  return (
    <div>
      {loggedIn ? 
        <div>
          <CreateBlogPostController
            passwordInput={passwordInput}
          />
          <AdminBlogPostListController
            passwordInput={passwordInput}
          />
          <AdminHideCommentsController
            passwordInput={passwordInput}
          />
          <AdminHideRepliesController
            passwordInput={passwordInput}
          />
        </div> :
        <AdminLogin
          passwordInput={passwordInput}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          submitAttempt={submitAttempt}
        />
      }
    </div>
  )
}

export default Admin