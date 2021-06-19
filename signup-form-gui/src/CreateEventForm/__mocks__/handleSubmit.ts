
import { sendServerRequest } from '../../serverConnection';
import { Action, ActionType } from '../../store/action';
import { createHandler } from '../../store/effect';
import { getDynamic } from '../../dynamicState';
import { AppDispatch } from '../../store';

/* Use handleSubmitActionHook to intercept all communication */

const handleSubmitAction = (storeAPI: unknown) => (next: AppDispatch) => (action: Action) => {
    const handleSubmitActionHook = getDynamic('handleSubmitActionHook');
    if (!handleSubmitActionHook) return next(action);

    return handleSubmitActionHook(storeAPI, next, action);
};

export { handleSubmitAction };
