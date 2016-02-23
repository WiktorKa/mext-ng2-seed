### Quick start

```bash
# clone repo
git clone https://github.com/WiktorKa/mext-ng2-seed.git

# change directory to our repo
cd mext-ng2-seed

# install the repo with npm
npm install

# start the server
npm start
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

### Objectives
We're going to create a seed project that can be used as a starting point for a typical web application. Let's set some requirements as follows:
* front-end written with Angular2 with TypeScript
* back-end written with Express.js - RESTful API
* MongoDB as data storage system
* authentication and authorization
* user CRUD
* pagination
* unit tests
* end-to-end tests

Our toolbox:
* GIT
* node.js + npm

### Create new project
First, we need to create a new project and get some basic dependencies. Open a terminal and change location for the one you're going to use to store project files, then type:
```
mkdir mext-ng2-seed-project && cd mext-ng2-seed-project
```
Now, initialize npm's config file (``package.json``):
```
npm init
```