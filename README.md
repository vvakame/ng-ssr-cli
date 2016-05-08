# ng-ssr-cli

Angular2 server side rendering commandline client.

work with [angular2-universal](https://github.com/angular/universal).

**DON'T USE `npm install -g ng-ssr-cli`**

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

$ ./bin/ngssr --templateHtml "<app>" --componentFile ./example/app.component.js
<html>

<head>
  <title></title>
  <style>
    div[_ngcontent-eba-1] {
      color: red;
    }
  </style>
</head>

<body>
  <app _nghost-eba-1="">
    <h1 _ngcontent-eba-1="">ng-ssr-cli demo!</h1>

    <div _ngcontent-eba-1="">Hello, SSR!</div>

    <a _ngcontent-eba-1="" href="/cat">Cat</a>
    <a _ngcontent-eba-1="" href="/game">Game</a>

    <router-outlet _ngcontent-eba-1="">
    </router-outlet>
  </app>
</body>

</html>
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
