import React from 'react'
import { Table, Column, Button } from 'react-rainbow-components'

const AdminHideRepliesView = ({ reportedReplies, handleClickUnreport, handleClickHide }) => {
  
  const unReportButton = ({ value }) => (
    <Button
      label='Unreport'
      variant='success'
      size='small'
      onClick={() => handleClickUnreport(value)}
    />
  )

  const hideButton = ({ value }) => (
    <Button
      label='Hide'
      variant='destructive'
      size='small'
      onClick={() => handleClickHide(value)}
    />
  )
  
  return (
    <div>
      <Table data={reportedReplies} keyField="body">
        <Column header='' field='_id' component={unReportButton} width={110}/>
        <Column header='' field='_id' component={hideButton} width={60}/>
        <Column header='Username' field='username' width={150}/>
        <Column header='Reply' field='body'/>
      </Table>
    </div>
  )
}

export default AdminHideRepliesView
