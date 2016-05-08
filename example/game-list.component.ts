import { Component } from '@angular/core';

export interface Game {
    title: string;
}

@Component({
    selector: "game-list",
    template: `
        <h2>Game list</h2>

        <div>
            <div *ngFor="let game of list">
                {{game.title}}
            </div>
        </div>
    `,
})
export class GameListComponent {
    list: Game[] = [
        { title: "Splatoon" },
        { title: "XCOM" },
        { title: "Faster Than Lightning" },
        { title: "Factorio" },
    ];
}
