let section = document.getElementById('posts')
let returnButton = document.getElementById('makepost')

let fetchUrl = 'http://localhost:3000/posts'
window.addEventListener('load', fetchData)

returnButton.addEventListener('click', () => {
    document.location.href = "./index.html"
})

async function fetchData(){
    let response = await fetch(fetchUrl)
    let data = await response.json();
    appendResult(data.posts)
}

function appendResult(data){
    console.log(data)
    data.forEach(appendResults)
}

function appendResults(postData){
    const postSection = document.createElement('section')
    const title = document.createElement('h1')
    const alias = document.createElement('h2')
    const description = document.createElement('description')
    const deleteButton = document.createElement('button')
    const editButton = document.createElement('button')

    title.textContent = postData.title;
    alias.textContent = postData.alias;
    description.textContent = postData.description;
    deleteButton.textContent = "delete"
    editButton.textContent = "edit"

    deleteButton.setAttribute('id',`${postData.id}-D`)
    deleteButton.setAttribute('id',`${postData.id}-E`)
    deleteButton.onclick = () => deletePost(postData.id, postSection)
    editButton.onclick = () => editPost(postData.id, postSection)

    postSection.appendChild(title)
    postSection.appendChild(alias)
    postSection.appendChild(description)
    postSection.appendChild(deleteButton)
    postSection.appendChild(editButton)

    section.appendChild(postSection)
}

function deletePost(id, section){
    console.log('deleting', id)
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/posts/${id}`, options)
        .then(section.remove())
        .catch(console.warn)
}

function editPost(){
    const options = { 
        method: 'PUT',
    };
    fetch(`http://localhost:3000/posts/${id}`, options)
        .then(r => r.json())
        .then(data => {
            const { post } = data
            tr.querySelectorAll('td')[1].textContent = dog.age
        })
        .catch(console.warn)
}


