import React from 'react'
import { Button, Modal, Input, Textarea } from 'react-rainbow-components'
import ModalFooterSubmit from '../modalFooterSubmit/ModalFooterSubmit'

const AddCommentView = ({ 
  modalIsOpen, 
  toggleModalIsOpen, 
  handleSubmit, 
  newComment, 
  handleChange, 
  resetCommentFields, 
  submitAttempt }) => {

    const usernameInput = newComment.username.length < 1 && submitAttempt ? 
      <Input 
        label='Username' 
        required
        error='This field is required'
        name='username'
        value={newComment.username}
        onChange={handleChange}
      /> : 
      <Input 
        label='Username'
        required 
        name='username'
        value={newComment.username}
        onChange={handleChange}
      />

    const bodyInput = newComment.body.length < 1 && submitAttempt ?
      <Textarea 
        label='Body' 
        required
        error='This field is required'
        name='body'
        value={newComment.body}
        onChange={handleChange}
      /> :
      <Textarea 
        label='Body' 
        required 
        name='body'
        value={newComment.body}
        onChange={handleChange}
      />

  return (
    <div>
      <Button
        label='Add Comment'
        variant='brand'
        size='small'
        onClick={() => {
          toggleModalIsOpen(!modalIsOpen)
          resetCommentFields()
        }}
      />
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => toggleModalIsOpen(false)}
          title="Add New Comment"
          footer={<ModalFooterSubmit
            toggleIsOpen={toggleModalIsOpen}
            handleSubmit={handleSubmit}
          />}
        >
          {usernameInput}
          {bodyInput}
      </Modal>
    </div>
  )
}

export default AddCommentView
