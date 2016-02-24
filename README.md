This tutorial is heavily based on [Angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) and it's purpose is to ease learning process by providing step-by-step guide. 

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

Now, open ``package.json`` file and add following definitions:
```
  [...]
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
  "dependencies": {
    "angular2": "^2.0.0-beta.7",
    "es6-promise": "^3.1.2",
    "es6-shim": "^0.33.3",
    "es7-reflect-metadata": "^1.5.5",
    "rxjs": "^5.0.0-beta.2",
    "zone.js": "^0.5.15"
  },
  "devDependencies": {
    "copy-webpack-plugin": "^1.1.1",
    "es6-promise-loader": "^1.0.1",
    "exports-loader": "^0.6.3",
    "expose-loader": "^0.7.1",
    "html-webpack-plugin": "^2.9.0",
    "json-loader": "^0.5.4",
    "raw-loader": "^0.5.1",
    "reflect-metadata": "0.1.2",
    "source-map-loader": "^0.1.5",
    "ts-loader": "^0.8.1",
    "typescript": "1.7.5",
    "typings": "^0.6.8",
    "webpack": "^1.12.14",
    "webpack-dev-server": "^1.14.1"
  },
  "engines": {
    "node": ">= 4.2.1 <= 5",
    "npm": ">= 3"
  }
```

To generate static assets and transpile from ES6 to ES5 we're gonna need Webpack with bunch of loaders.
> More on ES6 build tools you can find here: [AngularClass/ES6-build-tools](https://github.com/AngularClass/ES6-build-tools)

To ease the development process we're going to use [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html).

In addition we need some configuration for TypeScript transpilers.
Create new file ``tsconfig.json`` and copy/paste following:
```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true
  },
  "exclude": [
    "node_modules",
    "typings/main",
    "typings/main.d.ts"
  ],
  "filesGlob": [
    "./src/**/*.ts",
    "./test/**/*.ts",
    "!./node_modules/**/*.ts",
    "src/custom_typings.d.ts",
    "typings/browser.d.ts"
  ],
  "compileOnSave": false,
  "buildOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
}
```

Create also ``typings.json``:
```
{
  "dependencies": {
    "es6-promise": "github:typed-typings/npm-es6-promise#fb04188767acfec1defd054fc8024fafa5cd4de7"
  },
  "devDependencies": {},
  "ambientDependencies": {
    "angular-protractor": "github:DefinitelyTyped/DefinitelyTyped/angular-protractor/angular-protractor.d.ts#64b25f63f0ec821040a5d3e049a976865062ed9d",
    "es6-shim": "github:DefinitelyTyped/DefinitelyTyped/es6-shim/es6-shim.d.ts#6697d6f7dadbf5773cb40ecda35a76027e0783b2",
    "hammerjs": "github:DefinitelyTyped/DefinitelyTyped/hammerjs/hammerjs.d.ts#74a4dfc1bc2dfadec47b8aae953b28546cb9c6b7",
    "jasmine": "github:DefinitelyTyped/DefinitelyTyped/jasmine/jasmine.d.ts#4b36b94d5910aa8a4d20bdcd5bd1f9ae6ad18d3c",
    "ng2": "github:gdi2290/typings-ng2/ng2.d.ts#32998ff5584c0eab0cd9dc7704abb1c5c450701c",
    "node": "github:DefinitelyTyped/DefinitelyTyped/node/node.d.ts#8cf8164641be73e8f1e652c2a5b967c7210b6729",
    "selenium-webdriver": "github:DefinitelyTyped/DefinitelyTyped/selenium-webdriver/selenium-webdriver.d.ts#a83677ed13add14c2ab06c7325d182d0ba2784ea",
    "webpack": "github:DefinitelyTyped/DefinitelyTyped/webpack/webpack.d.ts#95c02169ba8fa58ac1092422efbd2e3174a206f4",
    "zone.js": "github:DefinitelyTyped/DefinitelyTyped/zone.js/zone.js.d.ts#c393f8974d44840a6c9cc6d5b5c0188a8f05143d"
  }
}
```

> For more details go to [Angular2 Quickstart](https://angular.io/docs/ts/latest/quickstart.html)
> More on [ambient definitions](http://www.typescriptlang.org/Handbook#modules-working-with-other-javascript-libraries)

Now, install dependencies:
```
# run "clean:install" script from packages.json
npm run clean:install
```
Above command should end up creating new folders ``node_modules`` and ``typings``.

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

We also need another file, name it ``src/polyfills.ts`` and copy/paste:
```
// Polyfills
import 'es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'es6-promise';

if ('production' === process.env.ENV) {
  // Production

  // In production Reflect with es7-reflect-metadata/reflect-metadata is added

  // Zone.js
  require('zone.js/dist/zone-microtask.min');

  // RxJS
  // In production manually include the operators you use
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/mergeMap');

} else {
  // Development

  // Reflect Polyfill
  require('es7-reflect-metadata/src/global/browser');
  // In production Reflect with es7-reflect-metadata/reflect-metadata is added

  // by webpack.prod.config ProvidePlugin
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/zone-microtask');
  require('zone.js/dist/long-stack-trace-zone');

  // RxJS
  // In development we are including every operator
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/mergeMap');

}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
```

Now, let's try to give it a run. 
```
npm run server
```