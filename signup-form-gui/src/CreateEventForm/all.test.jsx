
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Action, ActionType } from '../store/action';
import { getDynamic, setDynamic } from '../dynamicState';
import { CreateEventForm } from '../CreateEventForm';
import App from '../App';

/*******
 * Helper functions
 *******/

const renderForm = () => render(
    <Provider store={store}>
        <CreateEventForm />
    </Provider>);

const resetStore = () => store.dispatch({ type: ActionType.Logout });

/*****
 * Mocks
 *****/

jest.mock('./handleSubmit');

/******
 * Tests
 ******/

it('renders title', () => {
    const { getByText } = renderForm();

    expect(getByText(/new event/i)).toBeInTheDocument();
});

it('renders sumbit button', () => {
    const { getByText } = renderForm();

    expect(getByText("Create")).toBeInTheDocument();
});

it('submits server request', (done) => {
    resetStore();

    const { getByText } = renderForm();

    const btn = getByText("Create");

    expect(btn).toBeInTheDocument();

    setDynamic('handleSubmitActionHook',
               (action) => { done(); return '{ id: "example-id-2" }'; },
               () => fireEvent.click(btn));

});

it('submits server request through middleware', (done) => {
    resetStore();

    const { getByText } = renderForm();

    const btn = getByText("Create");

    expect(btn).toBeInTheDocument();

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                 done();
        }

        return next(action);
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

});
