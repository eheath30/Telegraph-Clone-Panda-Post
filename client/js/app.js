
// Setup
const form = document.querySelector('#new-post-form');


//bind event listeners
form.addEventListener('submit', submitPost);

//fetch all posts on /posts page load
getAllPosts();

// index
function getAllPosts(){
    fetch('http://localhost:3000/posts')
        .then(r => r.json())
        // .then(appendPosts)
        .catch(console.warn)
};

// create new post
function submitPost(e){
    e.preventDefault();
    const postData = {
        name: e.target.title.value,
        age: e.target.name.value,
        age: e.target.description.value
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        // .then(appendPost)
        .then(() => e.target.reset())
        .catch(console.warn)
};
