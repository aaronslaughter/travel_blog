import React from 'react'
import { Card, CheckboxToggle } from 'react-rainbow-components'

const AdminBlogPostListView = ({ blogPosts, handleChange }) => {
  return (
    <div className='blogpost-wrapper'>
      {blogPosts.map((element, index) =>
        <div 
          key={index}
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
          <CheckboxToggle
            value={!element.hidden}
            label={element.hidden ? 'Hidden' : 'Active'}
            onChange={() => handleChange(element.hidden, element._id)}
          />
        </div>
      )}
    </div>
  )
}

export default AdminBlogPostListView
