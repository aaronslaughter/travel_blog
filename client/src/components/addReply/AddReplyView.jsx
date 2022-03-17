import React from 'react'
import { Button, Modal, Input, Textarea } from 'react-rainbow-components'
import ModalFooterSubmit from '../modalFooterSubmit/ModalFooterSubmit'

const AddReplyView = ({
  modalIsOpen, 
  toggleModalIsOpen, 
  handleSubmit, 
  newReply, 
  handleChange, 
  resetReplyFields, 
  submitAttempt }) => {

  const usernameInput = newReply.username.length < 1 && submitAttempt ? 
    <Input 
      label='Username' 
      required
      error='This field is required'
      name='username'
      maxLength={30}
      value={newReply.username}
      onChange={handleChange}
    /> : 
    <Input 
      label='Username'
      required 
      name='username'
      maxLength={30}
      value={newReply.username}
      onChange={handleChange}
    />

  const bodyInput = newReply.body.length < 1 && submitAttempt ?
    <Textarea 
      label='Body' 
      required
      error='This field is required'
      name='body'
      maxLength={500}
      value={newReply.body}
      onChange={handleChange}
    /> :
    <Textarea 
      label='Body' 
      required 
      name='body'
      maxLength={500}
      value={newReply.body}
      onChange={handleChange}
    />

  return (
    <div>
      <Button
        label='Reply'
        variant='brand'
        size='small'
        onClick={() => {
          toggleModalIsOpen(!modalIsOpen)
          resetReplyFields()
        }}
      />
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => toggleModalIsOpen(false)}
          title="Add New Reply"
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

export default AddReplyView
