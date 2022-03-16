import React from 'react'
import { useState, useEffect } from 'react'
import { GetReportedReplies, HideReply, UnreportReply } from '../../services/BlogServices'
import AdminHideRepliesView from './AdminHideRepliesView'

const AdminHideRepliesController = ({ passwordInput }) => {
  
  const [reportedReplies, setReportedReplies] = useState([])

  useEffect(() => {
    fetchReportedReplies()
  }, [])

  const fetchReportedReplies = async () => {
    const replies = await GetReportedReplies()
    setReportedReplies(replies)
  }

  const handleClickHide = async (replyId) => {
    await HideReply(replyId, passwordInput)
    
    fetchReportedReplies()
  }

  const handleClickUnreport = async (replyId) => {
    await UnreportReply(replyId, passwordInput)

    fetchReportedReplies()
  }
  
  return (
    <div>
      <AdminHideRepliesView
        reportedReplies={reportedReplies}
        handleClickHide={handleClickHide}
        handleClickUnreport={handleClickUnreport}
      />
    </div>
  )
}

export default AdminHideRepliesController
