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