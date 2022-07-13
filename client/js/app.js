// Setup
const form = document.querySelector('#new-post-form');
const postList = document.querySelector('table');
const viewBtn = document.getElementById('view');
const url = "http://localhost:3000/posts/"

//listening for hash changes
window.addEventListener('load', updateContent);

//update depending on hash changes
async function updateContent(){
    let hash = window.location.hash.substring(1);
    console.log("updateContent", hash)

    if(hash){
        //render new post
        form.remove()
        let id = hash.substring(5)

        let response = await fetch(`${url}${id}`)
        let data = await response.json();
        let posts = data.posts

        console.log(posts)
        
        //render post
        let body = document.querySelector('.body')
        let section = document.createElement('section')
        let title = document.createElement('h1')
        let alias = document.createElement('h2')
        let description = document.createElement('p')

        console.log(body)
        // body.appendChild(section)

        title.textContent = posts.title
        alias.textContent = posts.alias
        description.textContent == posts.description

        section.appendChild(title)
        section.appendChild(alias)
        section.appendChild(description)
        body.appendChild(section)
    }

}

//bind event listeners
form.addEventListener('submit', submitPost);
viewBtn.addEventListener('click', () => {
    document.location.href = "./results.html"
})

// create new post
function submitPost(e){
    e.preventDefault();
    console.log(e)

    const title = e.target.title.value
    const alias = e.target.alias.value
    const description = e.target.description.value

    if(title == "" || alias == "" || description == ""){
        submissionError();
    } else {
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

            // window.location.hash = "#post"
         getNewPostId(postData)
         
    }
};

function submissionError(){

    let errorNote = document.getElementById('errornote')
    console.log(errorNote)
    if(errorNote == null){
        errorNote = document.createElement('p')
        errorNote.textContent = "all fields require input"
        errorNote.style.color = 'red'
        errorNote.setAttribute('id', 'errornote')
        form.appendChild(errorNote)
    } 
}

async function getNewPostId(postData){
    let response = await fetch('http://localhost:3000/posts')
    let data = await response.json();
    let posts = data.posts
    // console.log(posts[posts.length-1].id)
    // console.log(posts)
    let postID = posts[posts.length-1].id
    window.location.hash = `#post/${postID}`

    //render post
    form.remove()
    let body = document.querySelector('.body')
        let section = document.createElement('section')
        let title = document.createElement('h1')
        let alias = document.createElement('h2')
        let description = document.createElement('p')

        console.log(body)
        // body.appendChild(section)

        title.textContent = postData.title
        alias.textContent = postData.alias
        description.textContent == postData.description

        section.appendChild(title)
        section.appendChild(alias)
        section.appendChild(description)
        body.appendChild(section)
}



async function getPost(id){
    try {
        const response = await fetch(`http://localhost:3000/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}



