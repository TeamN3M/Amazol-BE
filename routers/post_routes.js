const express = require('express')
const router = express.Router()

const post = require('../controllers/posts'); 
router.get('/',post.getPosts);

module.exports = router