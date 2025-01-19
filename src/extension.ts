import { ConfigurationChangeEvent, ExtensionContext, TextDocumentChangeEvent, TextEditor, window, workspace } from 'vscode'
import { Configuration } from './utils/configuration'
import { Decorator } from './utils/decorator'

let decorator_ref: Decorator | undefined = undefined
let context_ref: ExtensionContext | undefined = undefined

export async function activate(context: ExtensionContext): Promise<void> {
    // init everything
    const configuration = new Configuration()
    const decorator = new Decorator(configuration)
    decorator.update()

    decorator_ref = decorator
    context_ref = context

    // register change callbacks
    // TODO: pass editor and events properly
    window.onDidChangeActiveTextEditor(
        (editor: TextEditor | undefined) => {
            if (editor != undefined) {
                decorator.update()
            }
        },
        null,
        context.subscriptions
    )
    workspace.onDidChangeTextDocument(
        (_event: TextDocumentChangeEvent) => {
            decorator.update()
        },
        null,
        context.subscriptions
    )
    workspace.onDidChangeConfiguration(
        (_event: ConfigurationChangeEvent) => {
            if (!window.activeTextEditor.document.isDirty) {
                const configuration = new Configuration()
                decorator.update(configuration)
            }
        },
        null,
        context.subscriptions
    )
}

export async function deactivate(): Promise<void> {
    // dispose everything
    if (decorator_ref) {
        console.debug("Disposing tailwind breakpoint decorator.")
        decorator_ref?.dispose()
        decorator_ref = undefined
    }

    if (context_ref) {
        console.debug("Disposing tailwind breakpoint context.")
        context_ref.subscriptions.forEach((sub) => {
            sub.dispose()
        })
        context_ref = undefined
    }
}