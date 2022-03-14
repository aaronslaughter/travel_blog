import React from 'react'
import { Breadcrumbs, Breadcrumb } from 'react-rainbow-components'
import BlogPostCardView from '../blogPostCard/BlogPostCardView'
import BlogPostCommentsController from '../blogPostComments/BlogPostCommentsController'

const BlogPostDetailsView = ({ blogPostDetails, fetchBlogPostDetails }) => {
  return (
    <div>
      <Breadcrumbs>
        <Breadcrumb 
          label='Home'
          href={window.location.origin}
        />
        <Breadcrumb
          label={blogPostDetails.title}
        />
      </Breadcrumbs>
      <BlogPostCardView
        blogPostDetails={blogPostDetails}
      />
      <BlogPostCommentsController
        blogPostDetails={blogPostDetails}
        fetchBlogPostDetails={fetchBlogPostDetails}
      />
    </div>
  )
}

export default BlogPostDetailsView
