const express = require('express');
const router = express.Router();

const Post = require('../models/posts')

// dogs index route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        console.log(posts)
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router;
