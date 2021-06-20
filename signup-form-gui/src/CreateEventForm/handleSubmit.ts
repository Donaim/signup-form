
import { sendServerRequest } from '../serverConnection';
import { Action, ActionType } from '../store/action';
import { createHandler } from '../store/effect';

const handleSubmitAction = createHandler(ActionType.CreateEventFormSubmit, (action: Action) => {
    if (action.type !== ActionType.CreateEventFormSubmit) throw new Error("createHandler fault");

    sendServerRequest("create-event", action.options)
        .then(action.handle)
        .catch(err => action.handle(JSON.stringify({ error: "Server unavailable" })));
});

export { handleSubmitAction };
