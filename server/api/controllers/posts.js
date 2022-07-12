const express = require('express');
const router = express.Router();

const Post = require('../models/posts')

// post index route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        console.log(posts)
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body.title, req.body.alias, req.body.description)
        console.log("************************************")
        console.log("done")
        console.log("************************************")
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

module.exports = router;
