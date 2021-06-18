
import * as T from './types';
import { AppDispatch } from '../app/store';

type CallbackEvent = React.FormEvent<HTMLFormElement>

const submitCallback = (dispatch: AppDispatch) => (e: CallbackEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const options = Object.fromEntries([...formData.entries()]);

    function respond(ok: boolean, text: string) {
        dispatch({ type: T.FormActionType.ShowStatus, ok: ok, text: text });
    }

    function defaultError() {
        respond(false, "Internal server error");
    }

    function handle(response: any) {
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
