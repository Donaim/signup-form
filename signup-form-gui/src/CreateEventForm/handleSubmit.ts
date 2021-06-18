
import { sendServerRequest } from '../serverConnection';
import { Action, ActionType } from '../store/action';
import { createHandler } from '../store/effect';

const handleSubmitAction = createHandler(ActionType.Submit, (action: Action) => {
    if (action.type !== ActionType.Submit) throw new Error("createHandler fault");

    sendServerRequest("create-event", action.options).then(action.handle);
});

export { handleSubmitAction };
