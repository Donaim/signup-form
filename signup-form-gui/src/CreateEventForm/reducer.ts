
import { ActionType, Action } from '../store/action';
import * as T from './types';

const initialState: T.FormState = { type: T.FormStateType.ReceivingInput };

function formStateReducer(state: T.FormState = initialState, action: Action) {
    switch (action.type) {
        case ActionType.Submit:
            const ret1: T.FormState = {
                type: T.FormStateType.Submitting,
            };
            return ret1;
        case ActionType.ShowStatus:
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
