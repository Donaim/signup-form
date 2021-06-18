import { createStore, combineReducers, applyMiddleware, StoreEnhancer } from '@reduxjs/toolkit';
import { formStateReducer } from '../CreateEventForm/reducer';
import { handleSubmitAction } from '../CreateEventForm/handleSubmit';

const rootReducer = combineReducers({
    createEventForm: formStateReducer,
});

const enhancer: StoreEnhancer<{ dispatch: unknown; }, {}>
    = applyMiddleware(handleSubmitAction);

export const store = createStore(rootReducer, enhancer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
