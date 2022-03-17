import React from 'react'
import { Card } from 'react-rainbow-components'

const BlogPostCardView = ({blogPostDetails}) => {
  return (
    <div className='blogpost-card-wrapper'>
      <Card
        footer={
        <div className='blogpost-footer'>
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
