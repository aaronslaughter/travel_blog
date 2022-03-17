import React from 'react'
import { 
  Avatar,
  Accordion,
  AccordionSection,
  Button,
  Chip } from 'react-rainbow-components'

const BlogPostRepliesView = ({ replies, handleReport }) => {
  return (
    <div>
      {
        <Accordion>
          {replies.map((element, index) =>
            <AccordionSection
              key={index}
              label={
                <div>
                  {element.username}<br/>
                  {element.body}<br/>
                  {new Date(element.createdAt).toDateString()}
                </div>
              }
              icon={
                <Avatar
                  initials={element.username.toUpperCase()}
                  backgroundColor='#5c56b6'
                />
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
            </AccordionSection>
          )}
        </Accordion>
      }
      
    </div>
  )
}

export default BlogPostRepliesView
