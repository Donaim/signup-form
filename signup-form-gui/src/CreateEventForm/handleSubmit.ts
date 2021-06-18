
import { sendServerRequest } from '../serverConnection';
import { Action, ActionType } from '../app/action';
import { AppDispatch } from '../app/store';

const handleSubmitAction = (storeAPI: unknown) => (next: AppDispatch) => (action: Action) => {
    if (action.type === ActionType.Submit) {
        sendServerRequest("create-event", action.options).then(action.handle);
    }

    return next(action);
}

export { handleSubmitAction };
