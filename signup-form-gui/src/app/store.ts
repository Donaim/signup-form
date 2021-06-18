import { createStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { formStateReducer } from '../CreateEventForm/reducer';

const rootReducer = combineReducers({
    createEventForm: formStateReducer,
});

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
