const db = require('../db')
const { BlogPost } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

const main = async () => {
  
  const dropCollections = async () => {
    await BlogPost.collection.drop()
  }

  const blogPosts = []

  blogPosts.push(new BlogPost(
    {
      version: 1,
      title: 'Example Title 1',
      imageUrl: 'https://area515.org/wiki/images/a/a9/Example.jpg',
      body: 'Example 1 body text',
      comments: [
        {
          username: 'example user 1',
          body: 'example comment body 1',
          date: new Date(),
          reported: false,
          hidden: false,
          replies: [{
            username: 'example user 2',
            body: 'example reply body 1',
            date: new Date(),
            reported: false,
            hidden: false
          }]
        },
        {
          username: 'example user 2',
          body: 'example comment body 2',
          date: new Date(),
          reported: false,
          hidden: false,
          replies: [{
            username: 'example user 1',
            body: 'example reply body 2',
            date: new Date(),
            reported: false,
            hidden: false
          }]
        }
      ]
    }
  ))

  await dropCollections()
  console.log('Dropped Collections')

  await BlogPost.insertMany(blogPosts)
  console.log('Created Blog Posts!')

}

const run = async () => {
  await main()
  db.close()
}

run ()
