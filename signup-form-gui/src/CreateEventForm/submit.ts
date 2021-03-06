
import { AppDispatch } from '../store';
import { ActionType } from '../store/action';

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
        dispatch({ type: ActionType.CreateEventFormShowStatus, ok: ok, text: text });
    }

    function defaultError() {
        respond(false, "Internal server error");
    }

    function handle(response: unknown) {
        if (typeof(response) !== 'string') {
            defaultError();
            return;
        }

        let obj: { [key: string]: unknown } = {};
        try {
            obj = JSON.parse(response);
        } catch {
            defaultError();
            return;
        }

        if ('error' in obj) {
            if (typeof(obj.error) === 'string') {
                respond(false, obj.error);
            } else {
                defaultError();
                return;
            }
        }

        if ('id' in obj && typeof(obj.id) === 'string') {
            respond(true, obj.id);
            return;
        }

        defaultError();
    }

    dispatch({ type: ActionType.CreateEventFormSubmit, options: options, handle });
}

export { submitCallback };
