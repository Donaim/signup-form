
import { sendServerRequest } from '../serverConnection';
import * as T from './types';

const initialState: T.FormState = { type: T.FormStateType.ReceivingInput };

function formStateReducer(state: T.FormState = initialState, action: T.FormAction) {
    switch (action.type) {
        case T.FormActionType.Submit:
            sendServerRequest("create-event", action.options).then(action.handle);
            const ret1: T.FormState = {
                type: T.FormStateType.Submitting,
            };
            return ret1;
        case T.FormActionType.ShowStatus:
            const ret2: T.FormState = {
                type: T.FormStateType.ReportingStatus,
                ok: action.ok,
                text: action.text,
            };
            return ret2;
    }

    return state;
}

export { formStateReducer };
