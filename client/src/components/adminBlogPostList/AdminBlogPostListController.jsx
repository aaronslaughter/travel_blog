import React from 'react'
import { useState, useEffect } from 'react'
import { GetAllBlogPosts, HideBlogPost, ShowBlogPost } from '../../services/BlogServices'
import AdminBlogPostListView from './AdminBlogPostListView'

const AdminBlogPostListController = ({ passwordInput }) => {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    const posts = await GetAllBlogPosts()
    setBlogPosts(posts)
  }


  const handleChange = async (isHidden, blogPostId) => {
    if (isHidden) {

      const showPost = async () => {
        await ShowBlogPost(blogPostId, passwordInput)
      }

      await showPost()
      await fetchBlogPosts()
      
    } else {

      const hidePost = async () => {
        await HideBlogPost(blogPostId, passwordInput)
      }

      await hidePost()
      await fetchBlogPosts()
    }
  }

  return (
    <div>
      <AdminBlogPostListView
        blogPosts={blogPosts}
        handleChange={handleChange}
      />
    </div>
  )
}

export default AdminBlogPostListController
