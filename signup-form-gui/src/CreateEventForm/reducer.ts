
import { sendServerRequest } from '../serverConnection';
import * as T from './types';

const initialState: T.FormState = { type: T.FormStateType.ReceivingInput };

function formStateReducer(state: T.FormState = initialState, action: T.FormAction) {
    if (typeof(action.type) === 'string') {
        /* NOTE: redux passes actions that are not of type T.FormAction */
        return state;
    }

    switch (action.type) {
        case T.FormActionType.Submit:
            sendServerRequest("create-event", action.options)
                    .then((response) => action.handle(response));
            return {
                type: T.FormStateType.Submitting,
            } as T.FormState;
        case T.FormActionType.ShowStatus:
            return {
                type: T.FormStateType.ReportingStatus,
                text: action.text,
            } as T.FormState;
        default:
            throw new Error("Impossible");
    }
}

export { formStateReducer };
