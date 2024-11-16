import {
    DecorationRenderOptions,
    workspace,
    WorkspaceConfiguration
} from 'vscode'

export type BreakpointConfiguration = {
    breakpoint?: string
    decoration?: DecorationRenderOptions
}

export interface Configurations {
    breakpoints: BreakpointConfiguration[]
    languages: string[]
}

export class Configuration implements Configurations {
    private configuration: WorkspaceConfiguration

    constructor() {
        this.configuration = workspace.getConfiguration("tailwind-breakpoint")
    }

    get languages(): Configurations["languages"] | undefined {
        return this.configuration.get('languages')
    }

    get breakpoints(): Configurations["breakpoints"] | undefined {
        return this.configuration.get('breakpoints')
    }
}