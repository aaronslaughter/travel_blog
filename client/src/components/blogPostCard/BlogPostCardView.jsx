import React from 'react'
import { Card } from 'react-rainbow-components'

const BlogPostCardView = ({blogPostDetails}) => {
  return (
    <div>
      <Card
        footer={
        <div>
          <h1>{blogPostDetails.title}</h1>
          <img src={blogPostDetails.imageUrl} alt={blogPostDetails.title} />
          <p>{blogPostDetails.body}</p>
        </div>
        }
      />
    </div>
  )
}

export default BlogPostCardView
