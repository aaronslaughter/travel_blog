import React from 'react'
import { useState } from 'react'
import AdminLogin from '../../components/adminLogin/AdminLogin'
import CreateBlogPostController from '../../components/createBlogPost/CreateBlogPostController'
import AdminBlogPostListController from '../../components/adminBlogPostList/AdminBlogPostListController'

const Admin = () => {

  const [passwordInput, setPasswordInput] = useState('')
  const [loggedIn, toggleLoggedIn] = useState(false)
  const [submitAttempt, toggleSubmitAttempt] = useState(false)

  const handleSubmit = () => {

    if (passwordInput === process.env.REACT_APP_KEY) {
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