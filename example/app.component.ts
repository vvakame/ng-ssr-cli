import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import {Http} from '@angular/http';

@Component({
    selector: "app",
    styles: [
        `div { color: red; }`,
    ],
    template: `
        <h1>ng-ssr-cli demo!</h1>
        
        <div>{{text}}</div>
    `,
    directives: [
        ...ROUTER_DIRECTIVES,
    ],
})
@RouteConfig([
])
export class AppComponent {
    text = "Hello, SSR!";

    constructor(/* public http: Http */) { }
}
