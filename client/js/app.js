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
        console.log(id)
        let response = await fetch(`${url}${id}`)
        let data = await response.json();
        let posts = data.posts

        console.log("posts:", posts)

        //render post
        let body = document.querySelector('#postBody')
        let section = document.createElement('section')
        let title = document.createElement('h1')
        let alias = document.createElement('h2')
        let description = document.createElement('p')
        let date = document.createElement('h3')
        let editBtn = document.createElement('button')

        console.log(body)
        // body.appendChild(section)


        title.textContent = posts.title
        alias.textContent = posts.alias
        description.textContent = posts.description
        date.textContent = posts.date
        editBtn.textContent = "edit post"
        editBtn.setAttribute('id', id)
        description.setAttribute('class', 'p-description')



        editBtn.addEventListener('click', editPost)

        section.appendChild(title)
        section.appendChild(alias)
        section.appendChild(date)
        section.appendChild(description)
        section.appendChild(editBtn)
        body.appendChild(section)
    }

}

//bind event listeners
form.addEventListener('submit', submitPost);
viewBtn.addEventListener('click', () => {
    document.location.href = "./hero.html"
})

// create new post
function submitPost(e){
    e.preventDefault();
    console.log(e)

    const title = e.target.title.value
    const alias = e.target.alias.value
    const description = e.target.description.value
    const dateObj = new Date();
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const newDate = dateObj.toLocaleString('default', dateOptions)
    console.log(newDate)

    if(title == "" || alias == "" || description == ""){
        submissionError();
    } else {
        const postData = {
            title: e.target.title.value,
            alias: e.target.alias.value,
            description: e.target.description.value,
            date: newDate
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
    let body = document.querySelector('#postBody')
        let section = document.createElement('section')
        let title = document.createElement('h1')
        let alias = document.createElement('h2')
        let description = document.createElement('p')
        let date = document.createElement('h3')
        let editBtn = document.createElement('button')

        console.log(body)
        // body.appendChild(section)

        title.textContent = postData.title
        alias.textContent = postData.alias
        description.textContent = postData.description
        date.textContent = postData.date
        editBtn.textContent = "edit post"
        editBtn.setAttribute('id', postID)

        //editBtn eventlistener
        editBtn.addEventListener('click', editPost)

        section.appendChild(title)
        section.appendChild(alias)
        section.appendChild(date)
        section.appendChild(description)
        section.appendChild(editBtn)
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

function editPost(){

    console.log("test")
    let editBtn = document.querySelector('button')
    // console.log(editBtn)
    let section = document.querySelector('section')
    let text = document.querySelector(".p-description")
    console.log(text)
    let textValue = document.querySelector("p").textContent
    // console.log(text, textValue)
    let publishBtn = document.createElement('button')
    publishBtn.setAttribute('id', `${editBtn.id}-p`)
    publishBtn.textContent = "publish post"

    //convert text box to text box input
    text.remove()
    let textbox = document.createElement('textarea')
    textbox.value = textValue
    linebreak = document.createElement("br");

    publishBtn.addEventListener('click', publishPost)
    section.appendChild(textbox)
    section.appendChild(linebreak)
    section.appendChild(publishBtn)
    editBtn.remove()

    // editBtn.textContent = id
    // console.log(editBtn)

}

async function publishPost(e){
    // console.log('test')
    console.log(e)
    let publishBtn = document.querySelector('button')
    let publishBtnId = publishBtn.id
    let id = publishBtnId.slice(0,publishBtnId.indexOf('-'))
    const dateObj = new Date();
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const newDate = dateObj.toLocaleString('default', dateOptions)

    const postData = {
        title: e.target.parentNode.childNodes[0].textContent,
        alias: e.target.parentNode.childNodes[1].textContent,
        description: e.target.parentNode.childNodes[3].value,
        date: newDate
    };

    const options = {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch(`http://localhost:3000/posts/${id}`, options)
            .then(r => r.json())
            .then(renderEditedPost(postData))
            .catch(console.warn)

    console.log(id, postData)

}

function renderEditedPost(postData){

    let section = document.querySelector('section')
    let publishBtn = document.querySelector('button')
    publishBtn.remove()
    let textarea = document.querySelector('textarea')
    textarea.remove()
    let text = document.createElement('p')

    let editBtn = document.createElement('button')
    editBtn.textContent = "edit post"
    editBtn.setAttribute('id', `${publishBtn.id}`)
    editBtn.addEventListener('click', editPost)
    let deleteBtn = document.createElement('input')
    // deleteBtn.setAttribute('type', "button")
    // deleteBtn.value = "delete post"
    // deleteBtn.addEventListener('click', deletePost)
    text.textContent = postData.description

    //append to section

    section.appendChild(text)
    section.appendChild(editBtn)



}


// function deletePost(id, section){
//     console.log('deleting', id)
//     const options = {
//         method: 'DELETE',
//     };
//     fetch(`http://localhost:3000/posts/${id}`, options)
//         .then(section.remove())
//         .catch(console.warn)
// }
