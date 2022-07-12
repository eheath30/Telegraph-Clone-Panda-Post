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
                // console.log(db);
                const postsData = await db.collection('posts').find().toArray()
                const posts = postsData.map(p => new Post({ ...p, id: p._id }))
                resolve(posts);
            } catch (err) {
                console.log(err);
                reject("Error retrieving posts")
            }
        })
    }


    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let postData = await db.collection('posts').find({ _id: ObjectId(id) }).toArray()
                let post = new Post({...postData[0], id: postData[0]._id});
                resolve (dog);
            } catch (err) {
                reject('Dog not found');
            }
        });
    }

    static create(title, alias, description){
        return new Promise (async (resolve, reject) => {
            try {
                console.log("entering create function")
                const db = await init();
                let postData = await db.collection('posts').insertOne({ title, alias, description })
                console.log(postData);
                let newPost = new Post(postData.ops[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }


}

module.exports = Post;
