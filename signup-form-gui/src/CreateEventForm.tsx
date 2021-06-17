
import React from 'react';
import { sendServerRequest } from './serverConnection';

type CallbackEvent = React.FormEvent<HTMLFormElement>

function CreateEventForm() {
    async function submit_callback(e: CallbackEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const options = Object.fromEntries([...formData.entries()]);
        const text = await sendServerRequest("create-event", options);
        /* TODO: redraw the form */
        console.log("got: ", text);
    }

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

export { CreateEventForm };
