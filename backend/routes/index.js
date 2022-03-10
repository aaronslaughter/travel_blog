const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/api', (req, res) => res.send('This is root!'))

module.exports = router
