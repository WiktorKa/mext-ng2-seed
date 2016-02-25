import {
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';

import {provide, Injector} from 'angular2/core';
import {JSONP_PROVIDERS, Jsonp, Response, ResponseOptions, JSONPBackend} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';

// Load the implementations that should be tested
import {App} from '../app/app';
import {WikipediaService} from '../services/wikipedia.service';

//var backend = injector.get(MockBackend);

// Listen for any new requests
//backend.connections.observer({
//    next: connection => {
//        var response = new Response(new ResponseOptions({body: '[{name: "A"}, {name: "B"}]'}));
//        setTimeout(() => {
//            // Send a response to the request
//            connection.mockRespond(response);
//        }, 100);
//    }
//});

describe('App component', () => {
    beforeEachProviders(() => [
        JSONP_PROVIDERS,
        MockBackend,
        provide(JSONPBackend, {useExisting: MockBackend}),
        App,
        WikipediaService
    ]);
    it('should have empty item list at the beginning', inject( [App], (app) => {
        expect(app.items.length).toEqual(0);
    }));
    it('should have non-empty list after search a term', inject( [App], (app) => {
        app.search('test');
        expect(app.items.length).not.toEqual(0);
    }));
});
