import { createStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { formStateReducer } from '../CreateEventForm/reducer';

export const store = createStore(formStateReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
