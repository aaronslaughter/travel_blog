const mongoose = require('mongoose')
require('dotenv').config()

let dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://127.0.0.1:27017/travel_blog'

mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log('Connection error', e.message);
  })
  
process.env.NODE_ENV === 'production' ? mongoose.set('debug', false) : mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db
