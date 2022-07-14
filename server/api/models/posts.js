const{init:init}=require("../dbConfig"),{ObjectId:ObjectId}=require("mongodb");class Post{constructor(t){this.id=t.id,this.title=t.title,this.alias=t.alias,this.description=t.description,this.date=t.date}static get all(){return new Promise((async(t,i)=>{try{const i=await init(),e=await i.collection("posts").find().toArray();t(e.map((t=>new Post({...t,id:t._id}))))}catch(t){i("Error retrieving posts")}}))}static findById(t){return new Promise((async(i,e)=>{try{const e=await init();let s=await e.collection("posts").find({_id:ObjectId(t)}).toArray();i(new Post({...s[0],id:s[0]._id}))}catch(t){e("Post not found")}}))}static create(t,i,e,s){return new Promise((async(o,a)=>{try{const a=await init();let n=await a.collection("posts").insertOne({title:t,alias:i,description:e,date:s});o(new Post(n.ops[0]))}catch(t){a("Error creating post")}}))}update(t,i,e){return new Promise((async(s,o)=>{try{const o=await init();await o.collection("posts").updateOne({_id:ObjectId(this.id)},{$set:{title:t,alias:i,description:e}}),s("post was updated")}catch(t){o(t,"Error updating post")}}))}destroy(){return new Promise((async(t,i)=>{try{const i=await init();await i.collection("posts").deleteOne({_id:ObjectId(this.id)}),t("Post was deleted")}catch(t){i("Post could not be deleted")}}))}}module.exports=Post;
