
import * as T from './types';
import { AppDispatch } from '../app/store';

type CallbackEvent = React.FormEvent<HTMLFormElement>

/* Object.fromEntries is not available on all browsers,
 * so we implement it ourselves for our limited use case */
function objectFromEntries(array: [string, unknown][]): object {
    let ret: { [key: string]: unknown } = {};
    for (const [key, val] of array) {
        ret[key] = val;
    }
    return ret;
}

const submitCallback = (dispatch: AppDispatch) => (e: CallbackEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const options = objectFromEntries([...formData.entries()]);

    function respond(ok: boolean, text: string) {
        dispatch({ type: T.FormActionType.ShowStatus, ok: ok, text: text });
    }

    function defaultError() {
        respond(false, "Internal server error");
    }

    function handle(response: unknown) {
        if (typeof(response) !== 'string') {
            defaultError();
            return;
        }

        let obj = { id: "" };
        try {
            obj = JSON.parse(response);
        } catch {
            defaultError();
            return;
        }

        if (obj && 'id' in obj && typeof(obj.id) === 'string') {
            respond(true, obj.id);
            return;
        }

        defaultError();
    }

    dispatch({ type: T.FormActionType.Submit, options: options, handle });
}

export { submitCallback };
