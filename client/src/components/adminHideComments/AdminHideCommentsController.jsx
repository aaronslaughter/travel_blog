import React from 'react'
import { useState, useEffect } from 'react'
import { GetReportedComments, HideComment, UnreportComment } from '../../services/BlogServices'
import AdminHideCommentsView from './AdminHideCommentsView'

const AdminHideCommentsController = ({ passwordInput }) => {

  const [reportedComments, setReportedComments] = useState([])

  useEffect(() => {
    fetchReportedComments()
  }, [])

  const fetchReportedComments = async () => {
    const comments = await GetReportedComments()
    setReportedComments(comments)
  }

  const handleClickHide = async (commentId) => {
    await HideComment(commentId, passwordInput)

    fetchReportedComments()
  }

  const handleClickUnreport = async (commentId) => {
    await UnreportComment(commentId, passwordInput)

    fetchReportedComments()
  }

  return (
    <div>
      <AdminHideCommentsView
        reportedComments={reportedComments}
        handleClickHide={handleClickHide}
        handleClickUnreport={handleClickUnreport}
      />
    </div>
  )
}

export default AdminHideCommentsController
