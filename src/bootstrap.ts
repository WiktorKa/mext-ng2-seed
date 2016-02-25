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
import {WikipediaService} from "./services/wikipedia.service";

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