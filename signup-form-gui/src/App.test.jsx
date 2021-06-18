import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

/*******
 * Helper functions
 *******/

const renderApp = () => render(
    <Provider store={store}>
        <App />
    </Provider>);

/* dynamicState is for passing
 * hooks inside mocked objects */
const dynamicState = {};

function getDynamic(name) {
    return dynamicState[name];
}

function setDynamic(name, value, body) {
    const previous = dynamicState[name];
    try {
        dynamicState[name] = value;
        return body();
    } finally {
        dynamicState[name] = previous;
    }
}

const sendServerRequestHook = () => 0;
const mockGetDynamic = getDynamic;

/*****
 * Mocks
 *****/

jest.mock("./serverConnection", () => {
    return {
        __esModule: true,
        sendServerRequest: async (path, options) => {
            console.log("Sending server request", path, options);

            const hook = mockGetDynamic(sendServerRequestHook);
            hook && hook(path, options);

            return 'example-id';
        },
    };
});

/******
 * Tests
 ******/

test('renders title', () => {
    const { getByText } = renderApp();

    expect(getByText(/new event/i)).toBeInTheDocument();
});

test('renders sumbit button', () => {
    const { getByText } = renderApp();

    expect(getByText("Create")).toBeInTheDocument();
});

test("testing library sanity check", done => {
    function handleClick() {
        done();
    }

    const { getByText } = render(
        <button type="submit" onClick={handleClick} >Click Me</button>
    );

    const node = getByText("Click Me");
    fireEvent.click(node);
});

test('submits server request', (done) => {
    const { getByText } = renderApp();

    const btn = getByText("Create");

    expect(btn).toBeInTheDocument();

    setDynamic(sendServerRequestHook,
               (path, options) => done(),
               () => fireEvent.click(btn));
});
