
export enum ActionType {
    Submit,
    ShowStatus,
}

export interface Submit {
    type: ActionType.Submit,
    options: object,
    handle: (s: string) => void,
}

export interface ShowStatus {
    type: ActionType.ShowStatus,
    ok: boolean,
    text: string,
}

export type Action = Submit | ShowStatus
