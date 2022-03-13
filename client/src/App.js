import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const response = await axios.get(`http://localhost:3001/api/blogposts/active`)
      setBlogPosts(response.data.blogPosts)
    }
    
    fetchBlogPosts()
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
      {blogPosts.map((element, index) => 
        <div key={index}>{element.title}</div>
      )}
    </div>
  );
}

export default App;
