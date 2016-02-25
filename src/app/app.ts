import {Component} from 'angular2/core';
import {WikipediaService} from '../services/wikipedia.service';
import {JSONP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'my-app',
    template: `
    <div>
      <h2>Wikipedia Search</h2>
      <input #term type="text" (keyup)="search(term.value)">
      <ul>
        <li *ngFor="#item of items">{{item}}</li>
      </ul>
    </div>
    `,
    providers: [WikipediaService, JSONP_PROVIDERS]
})
export class App {
    items: Array<string> = [];

    constructor(private wikipediaService: WikipediaService) {

    }

    search(term: string) {
        this.wikipediaService.search(term).then(items => this.items = items);
    }
}
