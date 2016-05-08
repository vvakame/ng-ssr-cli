
"use strict";

import * as updateNotifier from "update-notifier";
let pkg = require("../package.json");

let notifier = updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
});
if (notifier.update) {
    notifier.notify();
}

import * as fs from "fs";
import * as path from "path";
import {generateHtml} from "./";

import * as commandpost from "commandpost";

interface RootOptions {
    templateHtml?: string[];
    templateFile?: string[];
    componentFile?: string[];
    componentName?: string[];
    originUrl?: string[];
    baseUrl?: string[];
    reqUrl?: string[];
    outFile?: string[];
}

let root = commandpost
    .create<RootOptions, {}>("ngssr")
    .version(pkg.version, "-v, --version")
    .usage(`ngssr --templateHtml "<app></app>" --componentFile ./example/app.component.js --componentName AppComponent`)
    .option("--templateHtml <templateHtml>", "string oftemplate html")
    .option("--templateFile <templateFile>", "path to template html file")
    .option("--componentFile <componentFile>", "path to component js file")
    .option("--componentName <componentName>", "component class name")
    .option("--originUrl <originUrl>", "specify origin url", "http://localhost:8080")
    .option("--baseUrl <baseUrl>", "specify base url", "/")
    .option("--reqUrl <reqUrl>", "specify request url", "/")
    .option("--outFile <outFile>", "output file of generated html")
    .action(opts => {
        Promise.resolve(null)
            .then(() => {
                let templateFile = opts.templateFile[0] || "";
                let templateHtml = opts.templateHtml[0] || "";
                let componentFile = opts.componentFile[0] || "";
                let componentName = opts.componentName[0] || "";
                let originUrl = opts.originUrl[0] || "";
                let baseUrl = opts.baseUrl[0] || "";
                let reqUrl = opts.reqUrl[0] || "";

                // remove .js postfix
                if (componentFile.endsWith(".js")) {
                    componentFile = componentFile.substr(0, componentFile.length - 3);
                }
                // inference componentName from componentFile
                if (!componentName && componentFile.endsWith(".component")) {
                    // todo-list.component -> TodoListComponent
                    componentName = path.basename(componentFile)
                        .split(".")
                        .join("-")
                        .split("-")
                        .map(str => str.charAt(0).toUpperCase() + str.substr(1))
                        .join("");
                }
                // inference templateFile
                if (!templateFile && !templateHtml) {
                    let baseDir = path.dirname(componentFile);
                    let templateFilePath = path.join(baseDir, "index.html");
                    if (fs.existsSync(templateFilePath)) {
                        templateFile = templateFilePath;
                    }
                }

                // validation
                if (!templateFile && !templateHtml) {
                    return new Error("templateFile or templateHtml are required");
                }
                if (templateFile && templateHtml) {
                    return new Error("templateFile and templateHtml are exclusive");
                }
                if (!componentFile) {
                    return new Error("componentFile is required");
                }
                if (!componentName) {
                    return new Error("componentName is required");
                }

                // prepare generation
                let html = templateHtml;
                if (!html) {
                    let templateFilePath = path.join(process.cwd(), templateFile);
                    html = fs.readFileSync(templateFilePath, "utf8");
                }

                let componentFilePath = path.join(process.cwd(), componentFile);
                let m = require(componentFilePath);
                let component = m[componentName];
                if (!component) {
                    return new Error(`require("${componentFile}")["${componentName}"] is not defined`);
                }

                return generateHtml({
                    templateHtml: html,
                    component: component,
                    originUrl: originUrl,
                    baseUrl: baseUrl,
                    reqUrl: reqUrl,
                });
            })
            .then(html => {
                console.log(html);
            })
            .catch(errorHandler);
    });

commandpost
    .exec(root, process.argv)
    .catch(errorHandler);

function errorHandler(err: any) {
    "use strict";

    if (err instanceof Error) {
        console.error(err.stack);
    } else {
        console.error(err);
    }
    return Promise.resolve(null).then(() => {
        process.exit(1);
    });
}
