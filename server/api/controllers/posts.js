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

router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        // console.log(posts)
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body.title, req.body.alias, req.body.description, req.body.date)
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        await post.destroy()
        res.status(204).json('Post deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        await post.update(req.body.title, 
                            req.body.alias,
                            req.body.description)
        res.status(204).json('Post updated')
    } catch(err){
        res.status(500).json({err})
    }
})
// router.put('/:id', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id)
//         const updatedPost = await Post.update()
//         console.log(post)
//         res.json(updatedPost)
//     } catch(err) {
//         res.status(500).json({err})
//     }
// })

module.exports = router;
