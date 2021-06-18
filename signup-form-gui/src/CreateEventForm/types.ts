
export enum FormStateType {
    ReceivingInput,
    Submitting,
    ReportingStatus,
}

export type ReceivingInput = {
    type: FormStateType.ReceivingInput,
}

export type Submitting = {
    type: FormStateType.Submitting,
}

export type ReportingStatus = {
    type: FormStateType.ReportingStatus,
    ok: boolean,
    text: string,
}

export type FormState = ReceivingInput | Submitting | ReportingStatus

export enum FormActionType {
    Submit,
    ShowStatus,
}

export interface FormSubmit {
    type: FormActionType.Submit,
    options: object,
    handle: (s: string) => void,
}

export interface FormShowStatus {
    type: FormActionType.ShowStatus,
    ok: boolean,
    text: string,
}

export type FormAction = FormSubmit | FormShowStatus
