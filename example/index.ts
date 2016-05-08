import 'angular2-universal/polyfills';

import {bootstrap, enableProdMode, BROWSER_ROUTER_PROVIDERS, BROWSER_HTTP_PROVIDERS} from 'angular2-universal';

import {AppComponent} from './app.component';

enableProdMode();

bootstrap(AppComponent, [
    ...BROWSER_ROUTER_PROVIDERS,
    ...BROWSER_HTTP_PROVIDERS
]);
