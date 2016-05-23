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
}

type CliBootloaderConfig = { document?: any; } & BootloaderConfig;

export function generateHtml(opts: Options) {
    opts = Object.assign({
        originUrl: "http://localhost:8080",
        baseUrl: "/",
        reqUrl: "/",
    }, opts);

    let config: CliBootloaderConfig = {
        directives: [opts.component],
        platformProviders: [
            provide(ORIGIN_URL, { useValue: opts.originUrl }),
            provide(BASE_URL, { useValue: opts.baseUrl }),
        ],
        providers: [
            provide(REQUEST_URL, { useValue: opts.reqUrl }),
            ...NODE_ROUTER_PROVIDERS,
            ...NODE_HTTP_PROVIDERS,
        ],
        beautify: true,
        async: true,
        preboot: false,
    };

    enableProdMode();
    let doc = Bootloader.parseDocument(opts.templateHtml);
    config.document = doc;
    config.template = opts.templateHtml;
    let bootloader = Bootloader.create(config);
    return bootloader.serializeApplication();
}
