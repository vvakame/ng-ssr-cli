import { Component } from '@angular/core';

export interface Cat {
    kind: string;
}

@Component({
    selector: "cat-list",
    template: `
        <h2>Cat list</h2>

        <div>
            <div *ngFor="let cat of list">
                {{cat.kind}}
            </div>
        </div>
    `,
})
export class CatListComponent {
    list: Cat[] = [
        { kind: "Norwegian Forest Cat" },
        { kind: "Maine Coon" },
        { kind: "Somali" },
    ];
}
