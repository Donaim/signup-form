
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
