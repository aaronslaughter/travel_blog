import React from 'react'
import { Button, Modal, Input, Textarea } from 'react-rainbow-components'
import ModalFooterSubmit from '../modalFooterSubmit/ModalFooterSubmit'

const AdminCreateBlogPostView = ({ 
  newBlogPost, 
  handleSubmit, 
  handleChange, 
  isOpen, 
  toggleIsOpen,
  resetDataFields,
  submitAttempt
}) => {

  const titleInput = newBlogPost.title.length < 1 && submitAttempt ? 
    <Input 
      label='Title' 
      required
      error='This field is required'
      name='title'
      value={newBlogPost.title}
      onChange={handleChange}
    /> : 
    <Input 
      label='Title'
      required 
      name='title'
      value={newBlogPost.title}
      onChange={handleChange}
    />

  const imageUrlInput = newBlogPost.imageUrl.length < 1 && submitAttempt ?
    <Input 
      label='Image Url' 
      required
      error='This field is required'
      name='imageUrl'
      value={newBlogPost.imageUrl}
      onChange={handleChange}
    /> :
    <Input 
      label='Image Url' 
      required 
      name='imageUrl'
      value={newBlogPost.imageUrl}
      onChange={handleChange}
    />

  const bodyInput = newBlogPost.body.length < 1 && submitAttempt ?
    <Textarea 
      label='Body' 
      required
      error='This field is required'
      name='body'
      value={newBlogPost.body}
      onChange={handleChange}
    /> :
    <Textarea 
      label='Body' 
      required 
      name='body'
      value={newBlogPost.body}
      onChange={handleChange}
    />
  
    return (
      <div className='create-blogpost-button-wrapper'>
        <Button
          label='Create Blog Post'
          variant='brand'
          onClick={() => {
            toggleIsOpen(!isOpen)
            resetDataFields()
          }}
        />
        <Modal
          isOpen={isOpen}
          onRequestClose={() => toggleIsOpen(false)}
          title="Create New Blog Post"
          footer={<ModalFooterSubmit
            toggleIsOpen={toggleIsOpen}
            handleSubmit={handleSubmit}
          />}
        >
          {titleInput}
          {imageUrlInput}
          {bodyInput}
        </Modal>
      </div>
  )
}

export default AdminCreateBlogPostView
