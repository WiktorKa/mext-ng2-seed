import {
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';

import {WikipediaService} from '../services/wikipedia.service';
import {JSONP_PROVIDERS, JSONPBackend, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/src/http/backends/mock_backend';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
require('rxjs/add/operator/toPromise');

describe('Wikipedia Service', () => {
    beforeEachProviders(() => [
        JSONP_PROVIDERS,
        provide(JSONPBackend, {useClass: MockBackend}),
        WikipediaService
    ]);
    it('should get results', injectAsync([WikipediaService, JSONPBackend], (service, backend) => {
        backend.connections.subscribe( (connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({body: ['test', ['Test1', 'Test2']]})));
        } );
        return service.search('test').then( response => {
            expect(response.length).toEqual(2);
        });
    }));
});
