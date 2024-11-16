"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const configuration_1 = require("./utils/configuration");
const decorator_1 = require("./utils/decorator");
let decorator_ref = undefined;
let context_ref = undefined;
async function activate(context) {
    // init everything
    const configuration = new configuration_1.Configuration();
    const decorator = new decorator_1.Decorator(configuration);
    decorator.update();
    decorator_ref = decorator;
    context_ref = context;
    // register change callbacks
    // TODO: pass editor and events properly
    vscode_1.window.onDidChangeActiveTextEditor((_editor) => {
        decorator.update();
    }, null, context.subscriptions);
    vscode_1.workspace.onDidChangeTextDocument((_event) => {
        decorator.update();
    }, null, context.subscriptions);
    vscode_1.workspace.onDidChangeConfiguration((_event) => {
        if (!vscode_1.window.activeTextEditor.document.isDirty) {
            const configuration = new configuration_1.Configuration();
            decorator.update(configuration);
        }
    }, null, context.subscriptions);
}
exports.activate = activate;
async function deactivate() {
    // dispose everything
    if (decorator_ref) {
        console.debug("Disposing decorator");
        decorator_ref?.dispose();
        decorator_ref = undefined;
    }
    if (context_ref) {
        console.debug("Disposing context");
        context_ref.subscriptions.forEach((sub) => {
            sub.dispose();
        });
        context_ref = undefined;
    }
}
exports.deactivate = deactivate;
