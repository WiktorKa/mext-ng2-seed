import {
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder,
    fakeAsync,
    tick
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
    it('should show search bar', injectAsync([TestComponentBuilder],(tcb) => {
        return tcb.createAsync(App).then((fixture) => {
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h2').innerText === 'Wikipedia Search').toEqual(true);
        });
    }));
    it('should have empty item list at the beginning', inject( [App], (app) => {
        expect(app.items.length).toEqual(0);
    }));
    it('should have non-empty list after search a term', injectAsync( [App], (app) => {
        return app.search('test').then((response) => {
            expect(app.items.length).toEqual(3);
        });
    }));
    it('should display a list of found items', inject([TestComponentBuilder], fakeAsync((tcb) => {
        var fixture;
        tcb.createAsync(App).then((rootFixture) => {
            fixture = rootFixture;
        });
        tick(); // Create component-tick (initializes fixture variable)
        fixture.debugElement.componentInstance.items = ['Test1', 'Test2', 'Test3'];
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('ul').children.length).toEqual(3);
    })));
});
