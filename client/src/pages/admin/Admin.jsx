import React from 'react'
import CreateBlogPostController from '../../components/createBlogPost/CreateBlogPostController'
import AdminBlogPostListController from '../../components/adminBlogPostList/AdminBlogPostListController'

const Admin = () => {

  return (
    <div>
      <CreateBlogPostController/>
      <AdminBlogPostListController/>
    </div>
  )
}

export default Admin