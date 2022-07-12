
// Setup
const form = document.querySelector('#new-post-form');
const postList = document.querySelector('table');


//bind event listeners
form.addEventListener('submit', submitPost);
// viewPostButton.addEventListener('click', () => {
//     document.location.href = "./results.html"
// })

//fetch all posts on /posts page load
getAllPosts();

// index
function getAllPosts(){
    fetch('http://localhost:3000/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create new post
function submitPost(e){
    e.preventDefault();
    console.log(e)
    const postData = {
        title: e.target.title.value,
        alias: e.target.alias.value,
        description: e.target.description.value
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .catch(console.warn)

        document.location.href = "./results.html"
};



