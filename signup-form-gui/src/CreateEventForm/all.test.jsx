
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
               (action) => { done(); return JSON.stringify({ id: "example-id-2" }); },
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

it('arrives at final state eventually', (done) => {
    resetStore();

    const { getByText } = renderForm();

    const btn = getByText("Create");

    expect(btn).toBeInTheDocument();

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                action.handle(JSON.stringify({ id: "example-id-2"}));
                break;
            case ActionType.CreateEventFormShowStatus:
                done();
                break;
        }

        return next(action);
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

});

it('correctly sequences events', (done) => {
    resetStore();

    const { getByText } = renderForm();

    const btn = getByText("Create");

    expect(btn).toBeInTheDocument();

    let lastAction = null;

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                expect(lastAction).toBeNull();
                lastAction = ActionType.CreateEventFormSubmit;
                action.handle(JSON.stringify({ id: "example-id-2"}));
                break;
            case ActionType.CreateEventFormShowStatus:
                expect(lastAction).toBe(ActionType.CreateEventFormSubmit);
                lastAction = ActionType.CreateEventFormShowStatus;
                done();
                break;
        }

        return next(action);
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

});

it('hides create button on submit', (done) => {
    resetStore();

    const { queryByText } = renderForm();

    const btn = queryByText("Create");
    expect(btn).toBeInTheDocument();

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                return next(action);
        }

        return;
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

    setTimeout(() => {
        done();
        const { queryByText, queryAllByText } = renderForm();
        expect(queryByText("Create")).toBeNull();
    }, 0);

});

it('shows loading on submit', (done) => {
    resetStore();

    const { queryByText } = renderForm();

    const btn = queryByText("Create");
    expect(btn).toBeInTheDocument();

    expect(queryByText(/Loading/i)).toBeNull();

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                /* NOTE: not sending server response */
                return next(action);
        }

        return;
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

    setTimeout(() => {
        done();

        const { queryByText, queryAllByText } = renderForm();
        expect(queryByText("Create")).toBeNull();

        expect(queryAllByText(/Loading/i).length == 0).toBeFalsy();
        for (const x of queryAllByText(/Loading/i)) {
            expect(x).toBeInTheDocument();
        }

    }, 0);

});

it('shows id after submit', (done) => {
    resetStore();

    const { queryByText } = renderForm();

    const btn = queryByText("Create");
    expect(btn).toBeInTheDocument();

    expect(queryByText(/Loading/i)).toBeNull();

    expect(queryByText(/error/i)).toBeNull();
    expect(queryByText(/Your event id/i)).toBeNull();

    function callback() {
        setTimeout(() => {
            done();

            const { queryByText, queryAllByText } = renderForm();
            expect(queryByText("Create")).toBeNull();
            expect(queryByText("Loading")).toBeNull();

            expect(queryByText(/Create/i)).toBeNull();
            expect(queryByText(/error/i)).toBeNull();

            expect(queryAllByText(/Your event id/i).length == 0).toBeFalsy();
            for (const x of queryAllByText(/Your event id/i)) {
                expect(x).toBeInTheDocument();
            }

        }, 0);
    }

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                const ret = next(action);
                action.handle(JSON.stringify({ id: 'example-id-6' }));
                callback();
                return ret;
        }

        return next(action);
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

});

it('shows error on server fail', (done) => {
    resetStore();

    const { queryByText } = renderForm();

    const btn = queryByText("Create");
    expect(btn).toBeInTheDocument();

    expect(queryByText(/Loading/i)).toBeNull();

    expect(queryByText(/error/i)).toBeNull();
    expect(queryByText(/Your event id/i)).toBeNull();

    function callback() {
        setTimeout(() => {
            done();

            const { queryByText, queryAllByText } = renderForm();
            expect(queryByText("Create")).toBeNull();
            expect(queryByText("Loading")).toBeNull();

            expect(queryByText(/Create/i)).toBeNull();
            expect(queryByText(/Your event id/i)).toBeNull();

            expect(queryAllByText(/error/i).length == 0).toBeFalsy();
            for (const x of queryAllByText(/error/i)) {
                expect(x).toBeInTheDocument();
            }

        }, 0);
    }

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                const ret = next(action);
                action.handle(JSON.stringify({ error: 'arificial test error' }));
                callback();
                return ret;
        }

        return next(action);
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

});

it('shows error on bad server response', (done) => {
    resetStore();

    const { queryByText } = renderForm();

    const btn = queryByText("Create");
    expect(btn).toBeInTheDocument();

    expect(queryByText(/Loading/i)).toBeNull();

    expect(queryByText(/error/i)).toBeNull();
    expect(queryByText(/Your event id/i)).toBeNull();

    function callback() {
        setTimeout(() => {
            done();

            const { queryByText, queryAllByText } = renderForm();
            expect(queryByText("Create")).toBeNull();
            expect(queryByText("Loading")).toBeNull();

            expect(queryByText(/Create/i)).toBeNull();
            expect(queryByText(/Your event id/i)).toBeNull();

            expect(queryAllByText(/error/i).length == 0).toBeFalsy();
            for (const x of queryAllByText(/error/i)) {
                expect(x).toBeInTheDocument();
            }

        }, 0);
    }

    const handler = (storeAPI, next, action) => {
        switch (action.type) {
            case ActionType.CreateEventFormSubmit:
                const ret = next(action);
                action.handle('not a json');
                callback();
                return ret;
        }

        return next(action);
    };

    setDynamic('handleSubmitActionHook',
               handler,
               () => fireEvent.click(btn));

});
