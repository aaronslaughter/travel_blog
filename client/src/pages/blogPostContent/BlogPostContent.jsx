import React from 'react'
import BlogPostDetailsController from '../../components/blogPostDetails/BlogPostDetailsController'

const BlogPostContent = (props) => {
  return (
    <div>
      <BlogPostDetailsController
        {...props}
      />
    </div>
  )
}

export default BlogPostContent
