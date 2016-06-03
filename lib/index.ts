import "angular2-universal/polyfills";

import {
    provide,
    enableProdMode,
    REQUEST_URL,
    ORIGIN_URL,
    BASE_URL,
    NODE_ROUTER_PROVIDERS,
    NODE_HTTP_PROVIDERS,
    Bootloader,
    BootloaderConfig,
} from "angular2-universal";

export interface Options {
    templateHtml: string;
    component: any;
    originUrl?: string; // e.g. http://localhost:8080
    baseUrl?: string;   // e.g. /
    reqUrl?: string;    // e.g. /foo
    preboot?: boolean | PrebootConfig;
}

// Config for https://github.com/angular/universal/blob/master/modules/universal/src/node/ng_preboot.ts
// https://github.com/angular/universal/blob/master/modules/preboot/src/interfaces/preboot_options.ts
export interface PrebootConfig {
    appRoot?: string;
    start?: boolean;
    replay?: "rerender" | "hydrate";
    buffer?: boolean;
    debug?: boolean;
    uglify?: boolean;
    presets?: string[];
}

type CliBootloaderConfig = { document?: any; } & BootloaderConfig;

export function generateHtml(opts: Options): Promise<string> {
    opts = Object.assign({
        originUrl: "http://localhost:8080",
        baseUrl: "/",
        reqUrl: "/",
        preboot: false,
    }, opts);

    let config: CliBootloaderConfig = {
        platformProviders: [
            provide(ORIGIN_URL, { useValue: opts.originUrl }),
            provide(BASE_URL, { useValue: opts.baseUrl }),
        ],
        beautify: true,
        async: true,
    };

    enableProdMode();

    config.preboot = opts.preboot;

    let bootloader = new Bootloader(config);
    return bootloader.serializeApplication({
        directives: [opts.component],
        template: opts.templateHtml,
        providers: [
            provide(REQUEST_URL, { useValue: opts.reqUrl }),
            ...NODE_ROUTER_PROVIDERS,
            ...NODE_HTTP_PROVIDERS,
        ]
    });
}
