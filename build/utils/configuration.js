"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const vscode_1 = require("vscode");
class Configuration {
    configuration;
    constructor() {
        this.configuration = vscode_1.workspace.getConfiguration("tailwind-breakpoint");
    }
    get languages() {
        return this.configuration.get('languages');
    }
    get breakpoints() {
        return this.configuration.get('breakpoints');
    }
}
exports.Configuration = Configuration;
