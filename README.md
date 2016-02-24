# Quick start

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

# Step by step tutorial

### Table of Contents
* [Objectives](#objectives)
* [Getting Started](#getting-started)
* [Writing first component](#writing-first-component)
## Objectives
We're going to create a seed project that can be used as a starting point for your next app. But first let's set some non-functional requirements:
* major part of code (and tests) are to be written in [TypeScript](http://www.typescriptlang.org/);
* front-end is based on [Angular2](https://angular.io/) framework;
* back-end is powered with [Express](http://expressjs.com/) for [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.org/);
* unit tests and end-to-end tests should be present and automated;
* we use [Webpack](http://webpack.github.io/docs/what-is-webpack.html) to generate static assets.

## Getting Started
First, we need to create a new project and get some basic dependencies. Open a terminal and change location for the one you're going to use to store project files, then type:
```
mkdir mext-ng2-seed-project && cd mext-ng2-seed-project

#  initialize npm's config file (package.json) with defaults (-y param):
npm init -y
```

Now, let's get Angular2:
```
# get angular2 library and save it as project's dependency (short version of: npm install angular2 --save)
npm i angular2 -S

# ... and same thing for angular's dependencies
npm i es6-promise es6-shim reflect-metadata rxjs zone.js -S
```

To generate static assets and transpile from ES6 to ES5 we're gonna need Webpack.
> More on ES6 build tools you can find here: [AngularClass/ES6-build-tools](https://github.com/AngularClass/ES6-build-tools)

```
# add webpack to our project
npm i webpack -D
```

In addition we need some configuration for TypeScript transpilers.
Create new file ``tsconfig.json`` and copy/paste following:
```
{
    "compilerOptions": {
    "target": "es5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
},
    "exclude": [
    "node_modules",
    "typings/main",
    "typings/main.d.ts"
  ]
}
```

Create also ``typings.json``:
```
{
  "ambientDependencies": {
    "es6-shim": "github:DefinitelyTyped/DefinitelyTyped/es6-shim/es6-shim.d.ts#6697d6f7dadbf5773cb40ecda35a76027e0783b2"
  }
}
```

> For more details go to [Angular2 Quickstart](https://angular.io/docs/ts/latest/quickstart.html)

Above configuration files will be used by webpack, so we need to install TypeScript webpack loaders:
```
# install webpack TypeScript loader
npm i ts-loader -D
```

We also need to get proper type definitions.
```
# install typings
npm i typings -D

# downlaod type definistions
node_modules/.bin/typings install

# install webpack definitions
node_modules/.bin/typings install webpack --ambient --save
```
Above commands should end up creating new folder ``typings``.
> More on [ambient definitions](http://www.typescriptlang.org/Handbook#modules-working-with-other-javascript-libraries)

To ease the development process we're going to use [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html):
```
# install webpack-dev-server with plugins
npm i webpack-dev-server html-webpack-plugin source-map-loader -D
```

## Writing first component
> We're not going to cover Angular details here, but rather wrap up  [The official Angular2 tutorial](https://angular.io/docs/ts/latest/quickstart.html) in order to create a production-ready app.
  
Create a new file named ``src/index.html`` and copy/paste following HTML markup:
```
<!DOCTYPE html>
<html lang="">
<head>
    <title></title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <!-- base url -->
    <base href="/">
</head>
<body>
<my-app>
    Loading...
</my-app>
<script src="http://localhost:8080/webpack-dev-server.js"></script>
</body>
</html>
```

Create another file ``src/app/app.ts``:
```
import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class App { }
```

Now, let's create a simple bootstrap file ``src/bootstrap.ts``:
```
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

const ENV_PROVIDERS = [];
if ('production' === process.env.ENV) {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(
        App, [
            ...ENV_PROVIDERS,
            ...HTTP_PROVIDERS,
            ...ROUTER_PROVIDERS,
            provide(LocationStrategy, { useClass: HashLocationStrategy })
        ]
    ).catch(err => console.error(err));
});
```

Edit your ``package.json`` file and in `scripts` section add following definitions:
```
"scripts": {
    "clean": "npm cache clean && rimraf node_modules doc typings coverage dist",
    "clean:dist": "rimraf dist",
    "preclean:install": "npm run clean",
    "clean:install": "npm set progress=false && npm install",
    "server": "npm run server:dev",
    "server:dev": "webpack-dev-server --hot --inline --profile --progress --watch --colors --display-error-details --content-base src/",
    "postinstall": "npm run typings-install",
    "typings-install": "typings install",
    "start": "npm run server:dev"
},
```

Now, let's try to give it a run. 
```
npm run server
```