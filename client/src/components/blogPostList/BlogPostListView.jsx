import React from 'react'
import { Card } from 'react-rainbow-components'


const BlogPostListView = ({blogPosts}) => {

  return (
    <div className='blogpost-wrapper'>
      {blogPosts.map((element, index) =>
        <div 
          key={index}
        >
          <a
            href={`${window.location.origin}/${element._id}`}
          >
            <Card
              key={index}
              footer={element.title}
              className='blogpost-card'
            >
              <img
                src={element.imageUrl}
                alt={element.title}
              />
            </Card>
          </a>
        </div>
      )}
    </div>
  )
}

export default BlogPostListView
