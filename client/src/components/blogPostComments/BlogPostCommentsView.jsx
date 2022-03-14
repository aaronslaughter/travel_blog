import React from 'react'
import BlogPostRepliesController from '../blogPostReplies/BlogPostRepliesController'
import { 
  Accordion,
  AccordionSection,
  Avatar,
  Button, 
  Chip, } from 'react-rainbow-components'

const BlogPostCommentsView = ({ comments, fetchBlogPostDetails, handleReport }) => {

  return (
    <div>
      <Accordion>
        {comments.map((element, index) => 
          <AccordionSection
            key={index}
            icon={
              <Avatar
                initials={element.username.toUpperCase()}
              />
            }
            label={
              <div>
                {element.username}<br/>
                {element.body}<br/>
                {new Date(element.createdAt).toDateString()}
              </div>
            }
          >
            {element.reported ?
              <Chip
                label='Reported'
                variant='neutral'
                size='small'
              /> :
              <Button
                label='Report'
                variant='destructive'
                size='small'
                onClick={() => handleReport(element._id)}
              />
            }
            <BlogPostRepliesController
              commentId={element._id}
              replies={element.replies}
              fetchBlogPostDetails={fetchBlogPostDetails}
            />
          </AccordionSection>
        )}
      </Accordion>
    </div>
  )
}

export default BlogPostCommentsView
