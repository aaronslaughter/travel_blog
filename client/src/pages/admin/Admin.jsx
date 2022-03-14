import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import CreateBlogPostController from '../../components/createBlogPost/CreateBlogPostController'

const Admin = () => {

  return (
    <div>
      <CreateBlogPostController/>
    </div>
  )
}

export default Admin