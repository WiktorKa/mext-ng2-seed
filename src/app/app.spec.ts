import {
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {App} from '../app/app';
import {WikipediaService} from '../services/wikipedia.service';

var mockWikipediaService = {
    search: (term: string) => {
        return new Promise<string[]>(resolve => resolve([term, 'Test1', 'Test2']));
    }
};

describe('App component', () => {
    beforeEachProviders(() => [
        provide(WikipediaService, {useValue: mockWikipediaService}),
        App
    ]);
    it('should have empty item list at the beginning', inject( [App], (app) => {
        expect(app.items.length).toEqual(0);
    }));
    it('should have non-empty list after search a term', inject( [App], (app) => {
        app.search('test').then((response) => {
            expect(app.items.length).toEqual(3);
        });
    }));
});
