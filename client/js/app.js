
// Setup
const form = document.querySelector('#new-post-form');
const postList = document.querySelector('table');


//bind event listeners
form.addEventListener('submit', submitPost);

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

            document.location.href = "./results.html"
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



