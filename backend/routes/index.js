const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req, res) => res.send('This is root!'))

router.post('/blogposts', controllers.createBlogPost)
router.get('/blogposts/active', controllers.getSummarizedActiveBlogPosts)
router.get('/blogposts', controllers.getAllSummarizedBlogPosts)
router.get('/blogposts/:id', controllers.getBlogPostById)
router.put('/blogposts/hide/:id', controllers.hideBlogPost)
router.put('/blogposts/show/:id', controllers.showBlogPost)
router.post('/blogposts/:id', controllers.addComment)
router.post('/comments/:id', controllers.addReply)
router.put('/comments/report/:id', controllers.reportComment)
router.put('/comments/hide/:id', controllers.hideComment)
router.put('/replies/report/:id', controllers.reportReply)
router.put('/replies/hide/:id', controllers.hideReply)

module.exports = router
