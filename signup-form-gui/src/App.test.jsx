import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

const renderForm = () => render(
    <Provider store={store}>
        <App />
    </Provider>);

test('renders title', () => {
    const { getByText } = renderForm();

    expect(getByText(/new event/i)).toBeInTheDocument();
});

test('renders sumbit button', () => {
    const { getByText } = renderForm();

    expect(getByText(/create/i)).toBeInTheDocument();
});
