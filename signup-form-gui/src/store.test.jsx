import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ActionType } from './store/action';
import { getDynamic, setDynamic } from './dynamicState';
import App from './App';

/*******
 * Helper functions
 *******/

const renderApp = () => render(
    <Provider store={store}>
        <App />
    </Provider>);

/*****
 * Mocks
 *****/

jest.mock("./serverConnection");

/******
 * Tests
 ******/

it('resets state on Logout event', (done) => {
    const initialState = JSON.stringify(store.getState());

    const { getByText } = renderApp();

    const btn = getByText("Create");

    expect(btn).toBeInTheDocument();

    setDynamic('sendServerRequestHook',
               (path, options) => null,
               () => fireEvent.click(btn));

    function callback1() {
        const newState = JSON.stringify(store.getState());
        expect(newState).not.toBe(initialState);

        store.dispatch({ type: ActionType.Logout });

        const newestState = JSON.stringify(store.getState());
        expect(newestState).toBe(initialState);

        done();
    }

    setTimeout(callback1, 0);
});
