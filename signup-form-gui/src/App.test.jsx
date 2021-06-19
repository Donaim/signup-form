import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
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

it('renders title', () => {
    const { getByText } = renderApp();

    expect(getByText(/new event/i)).toBeInTheDocument();
});

it('renders sumbit button', () => {
    const { getByText } = renderApp();

    expect(getByText("Create")).toBeInTheDocument();
});

it("passes testing library sanity check", done => {
    function handleClick() {
        done();
    }

    const { getByText } = render(
        <button type="submit" onClick={handleClick} >Click Me</button>
    );

    const node = getByText("Click Me");
    fireEvent.click(node);
});

it('submits server request', (done) => {
    const { getByText } = renderApp();

    const btn = getByText("Create");

    expect(btn).toBeInTheDocument();

    setDynamic('sendServerRequestHook',
               (path, options) => done(),
               () => fireEvent.click(btn));
});
