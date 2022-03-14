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
            footer={
              <CheckboxToggle
                value={!element.hidden}
                label={element.hidden ? 'Hidden - ' + element.title : 'Active - ' + element.title}
                onChange={() => handleChange(element.hidden, element._id)}
              />
            }
            className='blogpost-card'
          >
            <img
              src={element.imageUrl}
              alt={element.title}
            />
          </Card>
          
        </div>
      )}
    </div>
  )
}

export default AdminBlogPostListView
