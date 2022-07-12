const express = require('express');
const router = express.Router();

const Post = require('../models/posts')

// post index route
router.get('/', async (req, res) => {
    try {
        const posts = await Post.all
        // console.log(posts)
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body.title, req.body.alias, req.body.description)
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const dog = await Post.findById(req.params.id)
        await dog.destroy()
        res.status(204).json('Post deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const updatedPost = await Post.update()
        res.json({post: updatedPost})
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router;
