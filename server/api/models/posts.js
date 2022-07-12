const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class Post {
    constructor(data){
        this.id = data.id,
        this.alias = data.alias,
        this.title = data.title,
        this.description = data.description
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                console.log(db);
                const postsData = await db.collection('posts').find().toArray()
                const posts = postsData.map(p => new Post({ ...p, id: p._id }))
                resolve(posts);
            } catch (err) {
                console.log(err);
                reject("Error retrieving posts")
            }
        })
    }
}

module.exports = Post;
