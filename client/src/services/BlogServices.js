import { BASE_URL } from "../globals"
import axios from 'axios'

export const CreateBlogPost = async (newBlogPost) => {
  try {
    await axios.post(`${BASE_URL}/blogposts`, newBlogPost)
  } catch (error) {
    throw error
  }
}
