# ng-ssr-cli

Angular2 server side rendering commandline client.

work with [angular2-universal](https://github.com/angular/universal).

```
$ ngssr --help
  Usage: ngssr --templateHtml "<app></app>" --componentFile ./example/app.component.js --componentName AppComponent

  Options:

    --templateHtml <templateHtml>    string oftemplate html
    --templateFile <templateFile>    path to template html file
    --componentFile <componentFile>  path to component js file
    --componentName <componentName>  component class name
    --originUrl <originUrl>          specify origin url
    --baseUrl <baseUrl>              specify base url
    --reqUrl <reqUrl>                specify request url
    --outFile <outFile>              output file of generated html
```

## How to use

In your project.

```
$ npm install --save-dev ng-ssr-cli angular2-universal preboot @angular/platform-server
$ $(npm bin)/ngssr --templateFile <path to your html> --componentFile <path to your root component>
```

see [example](https://github.com/vvakame/ng-ssr-cli/tree/master/example)

## Try out

```
$ git clone git@github.com:vvakame/ng-ssr-cli.git
$ cd ng-ssr-cli
$ npm install

$ npm run build:example
$ npm start

$ npm run run-ngssr
.....!
```
