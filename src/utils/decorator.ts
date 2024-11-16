import {
    DecorationOptions,
    Range,
    TextEditor,
    TextEditorDecorationType,
    window
} from "vscode"
import { BreakpointConfiguration, Configuration } from "./configuration"
import { Match, matchAll } from "./match"

export class Decorator {
    decorators: Array<{ config: BreakpointConfiguration, decorator: TextEditorDecorationType }>
    configuration: Configuration

    private buildDecorators() {
        return this.configuration.breakpoints.map((configuration) => {
            return {
                config: configuration, decorator: window.createTextEditorDecorationType(configuration.decoration)
            }
        })
    }

    constructor(configuration: Configuration) {
        this.configuration = configuration
        this.decorators = this.buildDecorators()
    }

    private decorate(editor: TextEditor) {
        if (editor == null) {
            return
        }

        const document = editor.document
        const text = document.getText()

        this.decorators.forEach((decorator) => {
            const chars: DecorationOptions[] = []
            const regex = new RegExp(`${decorator.config.breakpoint}:+`, "g")
            const matches: Match[] = matchAll(text, regex)

            matches.forEach((match) => {
                const start = document.positionAt(match.start)
                const end = document.positionAt(match.end)
                const range = new Range(start, end)
                chars.push({ range })
            })

            editor.setDecorations(decorator.decorator, chars)
        })
    }

    update(configuration?: Configuration): void {
        if (configuration != null) {
            this.configuration = configuration
            this.decorators = this.buildDecorators()
        }
        const editor = window.activeTextEditor
        if (editor == null) {
            return
        }

        const languageId = editor.document.languageId
        if (!this.configuration.languages.includes(languageId)) {
            return
        }

        this.decorate(editor)
    }

    dispose(): void {
        this.decorators.forEach((decorator) => {
            decorator.decorator.dispose()
        })
    }
}