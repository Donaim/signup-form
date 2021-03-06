
import React from 'react';
import './CreateEventForm.css';
import './CreateEventForm/spinner.css';
import { useDispatch, useSelector } from 'react-redux';
import { submitCallback } from './CreateEventForm/submit';
import * as T from './CreateEventForm/types';
import { RootState } from './store';

type CallbackEvent = React.FormEvent<HTMLFormElement>
type CallbackFn = (e: CallbackEvent) => void

const formTemplate = (callback: CallbackFn) => (body: JSX.Element) => {
    return <div className="signup-form">
        <form onSubmit={callback} action="create-event" method="get">
            {body}
        </form>
    </div>
}

const inputTemplate = (callback: CallbackFn) => (submit: JSX.Element) => {
    return formTemplate(callback)(<React.Fragment>
        <h2>New event</h2>
        <div className="form-group row">
            <div className="col-xs-6"><input type="text" maxLength={20} className="form-control" name="first_name" placeholder="First Name" required={true} /></div>
            <div className="col-xs-6"><input type="text" maxLength={20} className="form-control" name="last_name" placeholder="Last Name" required={true} /></div>
        </div>
        <div className="form-group">
            <input type="email" maxLength={100} className="form-control" name="email" placeholder="Email" required={true} />
        </div>
        <div className="form-group">
            <input type="date" className="form-control" name="date" required={true} />
        </div>
        <div className="form-group">
            {submit}
        </div>
    </React.Fragment>
    );
}

const showStatus = (status: T.ReportingStatus) => {
    if (status.ok) {
        return <p className="center"> Your event id: <br></br> {status.text} </p>;
    } else {
        return <p className="center"> Error: <br></br> {status.text} </p>;
    }
}

const getForm = (callback: CallbackFn, state: T.FormState) => {
    const template = inputTemplate(callback);

    switch (state.type) {
        case T.FormStateType.ReportingStatus:
            return formTemplate(callback)(showStatus(state));

        case T.FormStateType.Submitting:
            return template(<button type="submit" className="btn btn-primary btn-lg btn-block login-btn">
                Loading <div className="space"> </div>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </button>);

        case T.FormStateType.ReceivingInput:
            return template(<button type="submit" className="btn btn-primary btn-lg btn-block login-btn">Create</button>);
    }
}

const CreateEventForm: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const callback = submitCallback(dispatch);
    const formState = useSelector((x: RootState) => x.createEventForm);
    return getForm(callback, formState);
}

export { CreateEventForm };
