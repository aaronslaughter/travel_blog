import React from 'react'
import { Button } from 'react-rainbow-components'

const ModalFooterSubmit = ({toggleIsOpen, handleSubmit}) => {
  return (
    <div className='modal-footer-wrapper'>
      <Button
        label='Cancel'
        variant='neutral'
        onClick={() => toggleIsOpen(false)}
      />
      <Button
        label='Submit'
        variant='success'
        onClick={() => handleSubmit()}
      />
    </div>
  )
}

export default ModalFooterSubmit