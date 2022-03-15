import React from 'react'
import { Input, Button } from 'react-rainbow-components'

const AdminLogin = ({ passwordInput, handleSubmit, handleChange, submitAttempt }) => {
  return (
    <div>
      <Input
        label='Input Password'
        placeholder='**********'
        type='password'
        name='passwordInput'
        error={submitAttempt ? 'Unauthorized' : null }
        value={passwordInput}
        onChange={handleChange}
      />
      <Button
        label='Submit'
        variant='success'
        onClick={handleSubmit}
      />
    </div>
  )
}

export default AdminLogin
