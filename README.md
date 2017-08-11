# Destination:Dev landing page

A landing page for destination:dev

## Prerequisites
You will need the following things properly installed on your computer.

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (with npm)
- [Gulp](http://gulpjs.com/)
- [Docker](http://docker.com/)

## Installation

- `git clone <repository-url` this repository
- `cd <repository name>`
- `npm install`

## Running / Development
- `gulp server`
- Visit your app at [http://localhost:3000/](http://localhost:3000/)

## Building for production
- `gulp build`
It'll generate a folder `dist` with all the code needed for production

## Deploying with docker
- `docker build -t <your username>/destination-dev-landing .`
- `docker run -p 49160:8080 -d <your username>/destination-dev-landing`

If you need to go inside the container you can use the `exec` command:
- `docker ps` get container id
- `docker exec -it <container id> /bin/bash`
