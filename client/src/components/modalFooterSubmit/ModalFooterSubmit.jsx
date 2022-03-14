import React from 'react'
import { Button } from 'react-rainbow-components'

const ModalFooterSubmit = ({toggleIsOpen, handleSubmit}) => {
  return (
    <div>
      <Button
        label='Cancel'
        variant='neutral'
        onClick={() => toggleIsOpen(false)}
      />
      <Button
        label='Submit'
        variant='brand'
        onClick={() => handleSubmit()}
      />
    </div>
  )
}

export default ModalFooterSubmit