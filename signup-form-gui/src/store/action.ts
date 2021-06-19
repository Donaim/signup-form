
export enum ActionType {
    CreateEventFormSubmit,
    CreateEventFormShowStatus,
    Logout,
}

export interface Submit {
    type: ActionType.CreateEventFormSubmit,
    options: object,
    handle: (s: string) => void,
}

export interface ShowStatus {
    type: ActionType.CreateEventFormShowStatus,
    ok: boolean,
    text: string,
}

/* Resets store state */
export interface Logout {
    type: ActionType.Logout,
}

export type Action = Submit | ShowStatus
