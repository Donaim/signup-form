
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendServerRequest } from './serverConnection';

type CallbackEvent = React.FormEvent<HTMLFormElement>

enum FormStateType {
    ReceivingInput,
    Submitting,
    ReportingStatus,
}

type ReceivingInput = {
    type: FormStateType.ReceivingInput,
}

type Submitting = {
    type: FormStateType.Submitting,
}

type ReportingStatus = {
    type: FormStateType.ReportingStatus,
    text: string,
}

type FormState = ReceivingInput | Submitting | ReportingStatus

const initialState: FormState = { type: FormStateType.ReceivingInput };

enum FormActionType {
    Submit,
    ShowStatus,
}

interface FormSubmit {
    type: FormActionType.Submit,
    options: object,
    handle: any,
}

interface FormShowStatus {
    type: FormActionType.ShowStatus,
    text: string,
}

type FormAction = FormSubmit | FormShowStatus

function formStateReducer(state: FormState = initialState, action: FormAction) {
    if (typeof(action.type) === 'string') {
        /* NOTE: redux passes actions that are not of type FormAction */
        return state;
    }

    switch (action.type) {
        case FormActionType.Submit:
            sendServerRequest("create-event", action.options)
                    .then((response) => action.handle(response));
            return {
                type: FormStateType.Submitting,
            } as FormState;
        case FormActionType.ShowStatus:
            return {
                type: FormStateType.ReportingStatus,
                text: action.text,
            } as FormState;
        default:
            throw new Error("Impossible");
    }
}

const formSelector = (dispatch: any) => (state: FormState) => {
    function submit_callback(e: CallbackEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const options = Object.fromEntries([...formData.entries()]);

        function handle(text: string) {
            dispatch({ type: FormActionType.ShowStatus, text: text });
        }

        dispatch({ type: FormActionType.Submit, options: options, handle });
    }

    switch (state.type) {
        case FormStateType.ReportingStatus:
            return <p> Response: {state.text} </p>;

        case FormStateType.Submitting:
            return <p> Loading... </p>;

        case FormStateType.ReceivingInput:
            return <div className="signup-form">
                <form onSubmit={submit_callback} action="create-event" method="get">
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
    return useSelector(formSelector(dispatch));
}

export { CreateEventForm, formStateReducer };
