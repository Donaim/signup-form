import { createStore, combineReducers, applyMiddleware, StoreEnhancer, Reducer, AnyAction } from '@reduxjs/toolkit';
import { formStateReducer } from './CreateEventForm/reducer';
import { handleSubmitAction } from './CreateEventForm/handleSubmit';
import { Action, ActionType } from './store/action';

const appReducer = combineReducers({
    createEventForm: formStateReducer,
});

/* Handle Logout action separately because it resets state of the whole store */
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === ActionType.Logout) {
        return appReducer(undefined, action as Action)
    }

    return appReducer(state, action as Action);
}

const enhancer: StoreEnhancer<{ dispatch: unknown; }, {}>
    = applyMiddleware(handleSubmitAction);

export const store = createStore(rootReducer, enhancer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
