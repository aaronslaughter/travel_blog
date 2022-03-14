import { BASE_URL } from "../globals"
import axios from 'axios'

export const CreateBlogPost = async (newBlogPost) => {
  try {
    await axios.post(`${BASE_URL}/blogposts`, newBlogPost)
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

export const HideBlogPost = async (blogPostId) => {
  try {
    await axios.put(`${BASE_URL}/blogposts/hide/${blogPostId}`)
  } catch (error) {
    throw error
  }
}

export const ShowBlogPost = async (blogPostId) => {
  try {
    await axios.put(`${BASE_URL}/blogposts/show/${blogPostId}`)
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
