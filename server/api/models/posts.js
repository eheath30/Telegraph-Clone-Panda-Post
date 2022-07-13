const { init } = require ('../dbConfig')
const { ObjectId } = require('mongodb')

class Post {
    constructor(data){
        this.id = data.id,
        this.title = data.title,
        this.alias = data.alias,
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
                // console.log(db)
                let postData = await db.collection('posts').find({ _id: ObjectId(id) }).toArray()
                let post = new Post({...postData[0], id: postData[0]._id});
                // console.log(post)
                resolve (post);
            } catch (err) {
                reject('Post not found');
            }
        });
    }

    static create (title, alias, description) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let postData = await db.collection('posts').insertOne({title, alias, description})
                console.log(postData)
                let newPost = new Post(postData.ops[0])
                resolve(newPost)
            } catch(err) {
                reject('Error creating post')
            }
        })
    }

    update(title, alias, description) {
            return new Promise (async (resolve, reject) => {
                try {
                    const db = await init();
                    console.log("***************")
                    console.log(db)
                    console.log("***************")
                    // let updatedPostData = await db.collection('posts').findByIdAndUpdate({ _id: ObjectId(this.id) }, { title: title, alias: alias, description: description })
                    // let updatedPost = new Post(updatedPostData);
                    // resolve (updatedPost);
                    resolve(db)
                } catch (err) {
                    reject('Error updating post');
                }
            });
        }

    destroy(){
            return new Promise(async(resolve, reject) => {
                try {
                    const db = await init();
                    await db.collection('posts').deleteOne({ _id: ObjectId(this.id) })
                    resolve('Post was deleted')
                } catch (err) {
                    reject('Dog could not be deleted')
                }
            })
        }
}

module.exports = Post;
