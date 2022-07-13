# Server for PandaBlogger

## Project description

This is the server for a minimal telegram-styled blog site.

## Installation

- Download or clone the repo
- In the terminal navigate to the `server` folder and run docker compose up
- Once the server is running open `client\index.html` to see the create-blog-post home-screen

## Usage

This blog gives users the ability to write a post with a title, a pseudonym and a body.
When the user hits 'publish', the post is stored in a database and the client is redirected to their posts path.
The user can then access their post using that show path, even after a server restart.

### Available Routes

Below are the routes available for use with the right usage:

- `/posts` GET method will retrieve all posts
- `/posts/:id` GET method will retrieve single post taking the post id as the parameter.
- `/posts` POST method will post a new post to the database.


## Layout

### Folders:

- client: contains front-end html files and img files
- - js: Contains front-end javascript functions
- - styles: contains front-end stylesheets
- server: contains the docker-compose yaml file required for server startup
- - api: contains nodejs server and dbConfig files
-   - controllers: Contains expressjs routes for requests.
-   - models: contains Post model
- - db: contains content for database seeding.


### Files:

Client:
- app.js -
- results.js -
- styles.css -
- index.html -
- results.html -

Server:
- posts.js -
- server.js -
- index.js -
- dbConfig.js -
- controllers/posts.js -
- models/posts.js -


## Technologies

- Node JS
- Express
- Nodemon
- Cors
- MongoDB

## Licence

[MIT Licence](https://opensource.org/licenses/mit-license.php)
