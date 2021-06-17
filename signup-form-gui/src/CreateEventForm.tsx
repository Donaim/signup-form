
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendServerRequest } from './serverConnection';
import { submitCallback } from './CreateEventFormSubmit';
import * as T from './CreateEventFormTypes';

const initialState: T.FormState = { type: T.FormStateType.ReceivingInput };

function formStateReducer(state: T.FormState = initialState, action: T.FormAction) {
    if (typeof(action.type) === 'string') {
        /* NOTE: redux passes actions that are not of type T.FormAction */
        return state;
    }

    switch (action.type) {
        case T.FormActionType.Submit:
            sendServerRequest("create-event", action.options)
                    .then((response) => action.handle(response));
            return {
                type: T.FormStateType.Submitting,
            } as T.FormState;
        case T.FormActionType.ShowStatus:
            return {
                type: T.FormStateType.ReportingStatus,
                text: action.text,
            } as T.FormState;
        default:
            throw new Error("Impossible");
    }
}

const formSelector = (callback: any) => (state: T.FormState) => {
    switch (state.type) {
        case T.FormStateType.ReportingStatus:
            return <p> Response: {state.text} </p>;

        case T.FormStateType.Submitting:
            return <p> Loading... </p>;

        case T.FormStateType.ReceivingInput:
            return <div className="signup-form">
                <form onSubmit={callback} action="create-event" method="get">
                    <h2>New event</h2>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xs-6"><input type="text" maxLength={20} className="form-control" name="first_name" placeholder="First Name" required={true} /></div>
                            <div className="col-xs-6"><input type="text" maxLength={20} className="form-control" name="last_name" placeholder="Last Name" required={true} /></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="email" maxLength={100} className="form-control" name="email" placeholder="Email" required={true} />
                    </div>
                    <div className="form-group">
                        <input type="date" className="form-control" name="date" required={true} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block login-btn">Create</button>
                    </div>
                </form>
            </div>

    }
}

function CreateEventForm() {
    const dispatch = useDispatch();
    const callback = submitCallback(dispatch);
    return useSelector(formSelector(callback));
}

export { CreateEventForm, formStateReducer };
