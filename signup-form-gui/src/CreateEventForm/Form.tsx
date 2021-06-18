
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitCallback } from './Submit';
import * as T from './Types';

const formTemplate = (callback: any) => (body: any) => {
    return <div className="signup-form">
        <form onSubmit={callback} action="create-event" method="get">
            {body}
        </form>
    </div>
}

const inputTemplate = (callback: any) => (submit: any) => {
    return formTemplate(callback)(<div>
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
            {submit}
        </div>
    </div>
    );
}

const formSelector = (callback: any) => (state: T.FormState) => {
    const template = inputTemplate(callback);

    switch (state.type) {
        case T.FormStateType.ReportingStatus:
            return formTemplate(callback)(<p> Response: {state.text} </p>);

        case T.FormStateType.Submitting:
            return template(<p> Loading... </p>);

        case T.FormStateType.ReceivingInput:
            return template(<button type="submit" className="btn btn-primary btn-lg btn-block login-btn">Create</button>);
    }
}

function CreateEventForm() {
    const dispatch = useDispatch();
    const callback = submitCallback(dispatch);
    return useSelector(formSelector(callback));
}

export { CreateEventForm };
