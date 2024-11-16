"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decorator = void 0;
const vscode_1 = require("vscode");
const match_1 = require("./match");
class Decorator {
    decorators;
    configuration;
    buildDecorators() {
        return this.configuration.breakpoints.map((configuration) => {
            return {
                config: configuration, decorator: vscode_1.window.createTextEditorDecorationType(configuration.decoration)
            };
        });
    }
    constructor(configuration) {
        this.configuration = configuration;
        this.decorators = this.buildDecorators();
    }
    decorate(editor) {
        if (editor == null) {
            return;
        }
        const document = editor.document;
        const text = document.getText();
        this.decorators.forEach((decorator) => {
            const chars = [];
            const regex = new RegExp(`${decorator.config.breakpoint}:+`, "g");
            const matches = (0, match_1.matchAll)(text, regex);
            matches.forEach((match) => {
                const start = document.positionAt(match.start);
                const end = document.positionAt(match.end);
                const range = new vscode_1.Range(start, end);
                chars.push({ range });
            });
            editor.setDecorations(decorator.decorator, chars);
        });
    }
    update(configuration) {
        if (configuration != null) {
            this.configuration = configuration;
            this.decorators = this.buildDecorators();
        }
        const editor = vscode_1.window.activeTextEditor;
        if (editor == null) {
            return;
        }
        const languageId = editor.document.languageId;
        if (!this.configuration.languages.includes(languageId)) {
            return;
        }
        this.decorate(editor);
    }
    dispose() {
        this.decorators.forEach((decorator) => {
            decorator.decorator.dispose();
        });
    }
}
exports.Decorator = Decorator;
