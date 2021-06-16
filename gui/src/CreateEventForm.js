
import React from 'react';

function CreateEventForm() {
    return <div className="signup-form">
               <form action="create-event" method="get">
                   <h2>New event</h2>
                   <div className="form-group">
                       <div className="row">
                           <div className="col-xs-6"><input type="text" className="form-control" name="first_name" placeholder="First Name" required="required" /></div>
                           <div className="col-xs-6"><input type="text" className="form-control" name="last_name" placeholder="Last Name" required="required" /></div>
                       </div>
                   </div>
                   <div className="form-group">
                       <input type="email" className="form-control" name="email" placeholder="Email" required="required" />
                   </div>
                   <div className="form-group">
                       <input type="date" className="form-control" name="date" required="required" />
                   </div>
                   <div class="form-group">
                       <button type="submit" class="btn btn-primary btn-lg btn-block login-btn">Create</button>
                   </div>
               </form>
           </div>

}

export { CreateEventForm };
