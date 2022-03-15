const express = require('express')
const routes = require('./backend/routes')
const db = require('./backend/db')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const PORT  = process.env.PORT || 3001

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

app.use('/api', routes)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  })
}

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
