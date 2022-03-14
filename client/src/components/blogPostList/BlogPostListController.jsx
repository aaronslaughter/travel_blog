import React from 'react'
import { useState, useEffect } from 'react'
import BlogPostListView from './BlogPostListView'
import { GetActiveBlogPosts } from '../../services/BlogServices'

const BlogPostListController = () => {

  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const posts = await GetActiveBlogPosts()
      setBlogPosts(posts)
    }

    fetchBlogPosts()
  }, [])

  return (
    <div>
      <BlogPostListView
        blogPosts={blogPosts}
      />
    </div>
  )
}

export default BlogPostListController
