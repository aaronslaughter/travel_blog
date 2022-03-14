import React from 'react'
import { useState, useEffect } from 'react'
import BlogPostDetailsView from './BlogPostDetailsView'
import { GetBlogPostDetails } from '../../services/BlogServices'

const BlogPostDetailsController = (props) => {

  const [blogPostDetails, setBlogPostDetails] = useState(null)

  useEffect(() => {
    fetchBlogPostDetails()
  }, [])

  const fetchBlogPostDetails = async () => {
    const response = await GetBlogPostDetails(props.match.params.blogPostId)
    setBlogPostDetails(response)
  }

  return (
    <div>
      {blogPostDetails && 
      <BlogPostDetailsView
        blogPostDetails={blogPostDetails}
        fetchBlogPostDetails={fetchBlogPostDetails}
      />}
    </div>
  )
}

export default BlogPostDetailsController
