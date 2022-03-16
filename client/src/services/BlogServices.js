import { BASE_URL } from "../globals"
import axios from 'axios'

export const ValidatePassword = async (passwordInput) => {
  try {
    const response = await axios.get(`${BASE_URL}/validate?api_key=${passwordInput}`)

    return response.data.validated
  } catch (error) {
    throw error
  }
}

export const CreateBlogPost = async (newBlogPost, passwordInput) => {
  try {
    await axios.post(`${BASE_URL}/blogposts?api_key=${passwordInput}`, newBlogPost)
  } catch (error) {
    throw error
  }
}

export const GetActiveBlogPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blogposts/active`)
    
    return response.data.blogPosts
  } catch (error) {
    throw error
  }
}

export const GetAllBlogPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blogposts`)

    return response.data.blogPosts
  } catch (error) {
    throw error
  }
}

export const HideBlogPost = async (blogPostId, passwordInput) => {
  try {
    await axios.put(`${BASE_URL}/blogposts/hide/${blogPostId}?api_key=${passwordInput}`)
  } catch (error) {
    throw error
  }
}

export const ShowBlogPost = async (blogPostId, passwordInput) => {
  try {
    await axios.put(`${BASE_URL}/blogposts/show/${blogPostId}?api_key=${passwordInput}`)
  } catch (error) {
    throw error
  }
}

export const GetBlogPostDetails = async (blogPostId) => {
  try {
    const response = await axios.get(`${BASE_URL}/blogposts/${blogPostId}`)

    return response.data.blogPost
  } catch (error) {
    return null
  }
}

export const CreateComment = async (blogPostId, newComment) => {
  try {
    await axios.post(`${BASE_URL}/blogposts/${blogPostId}`, newComment)
  } catch (error) {
    throw error
  }
}

export const CreateReply = async (commentId, newReply) => {
  try {
    await axios.post(`${BASE_URL}/comments/${commentId}`, newReply)
  } catch (error) {
    throw error
  }
}

export const ReportComment = async (commentId) => {
  try {
    await axios.put(`${BASE_URL}/comments/report/${commentId}`)
  } catch (error) {
    throw error
  }
}

export const ReportReply = async (replyId) => {
  try {
    await axios.put(`${BASE_URL}/replies/report/${replyId}`)
  } catch (error) {
    throw error
  }
}

export const GetReportedComments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/comments/reported`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const GetReportedReplies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/replies/reported`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const HideComment = async (commentId, passwordInput) => {
  try {
    await axios.put(`${BASE_URL}/comments/hide/${commentId}?api_key=${passwordInput}`)
  } catch (error) {
    throw error
  }
}

export const UnreportComment = async (commentId, passwordInput) => {
  try {
    await axios.put(`${BASE_URL}/comments/unreport/${commentId}?api_key=${passwordInput}`)
  } catch (error) {
    throw error
  }
}

export const HideReply = async (replyId, passwordInput) => {
  try {
    await axios.put(`${BASE_URL}/replies/hide/${replyId}?api_key=${passwordInput}`)
  } catch (error) {
    throw error
  }
}

export const UnreportReply = async (replyId, passwordInput) => {
  try {
    await axios.put(`${BASE_URL}/replies/unreport/${replyId}?api_key=${passwordInput}`)
  } catch (error) {
    throw error
  }
}
