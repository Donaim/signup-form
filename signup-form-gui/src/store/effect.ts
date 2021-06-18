
import { Action, ActionType } from './action';
import { AppDispatch } from '../store';

/* This is a helper module
 * for creating effect handlers. */

function createHandler(type: ActionType, handler: (a: Action) => void) {
    return (storeAPI: unknown) => (next: AppDispatch) => (action: Action) => {
        if (action.type === type) {
            handler(action);
        }

        return next(action);
    };
}

export { createHandler };
