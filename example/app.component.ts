import { Component } from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "@angular/router-deprecated";
import {Http} from "@angular/http";

import {CatListComponent} from "./cat-list.component";
import {GameListComponent} from "./game-list.component";

@Component({
    selector: "app",
    styles: [
        `div { color: red; }`,
    ],
    template: `
        <h1>ng-ssr-cli demo!</h1>

        <div>{{text}}</div>

        <a [routerLink]="['./Cat']">Cat</a>
        <a [routerLink]="['./Game']">Game</a>

        <router-outlet>
        </router-outlet>
    `,
    directives: [
        ...ROUTER_DIRECTIVES,
        CatListComponent,
        GameListComponent,
    ],
})
@RouteConfig([
    { path: '/cat', component: CatListComponent, as: "Cat" },
    { path: '/game', component: GameListComponent, as: "Game" },
])
export class AppComponent {
    text = "Hello, SSR!";

    constructor(public http: Http) { }
}
