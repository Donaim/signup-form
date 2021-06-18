import { createStore, combineReducers } from '@reduxjs/toolkit';
import { formStateReducer } from '../CreateEventForm/reducer';

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

const rootReducer = combineReducers({
    createEventForm: formStateReducer,
});

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
