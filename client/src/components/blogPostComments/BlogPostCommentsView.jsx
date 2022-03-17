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
        <div className='comment-wrapper'
          key={index}
        >
          <AccordionSection className='blogpost-comment'
            
            icon={
              <Avatar
                initials={element.username.toUpperCase()}
                backgroundColor='#5c56b6'
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
              <Chip className='report-comment'
                label='Reported'
                variant='neutral'
                size='small'
              /> :
              <Button className='report-comment'
                label='&nbsp;Report&nbsp;'
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
        </div>
        )}
      </Accordion>
    </div>
  )
}

export default BlogPostCommentsView
