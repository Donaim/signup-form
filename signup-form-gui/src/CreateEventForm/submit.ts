
import * as T from './types';

type CallbackEvent = React.FormEvent<HTMLFormElement>
type DispatchType = (a: T.FormAction) => void

const submitCallback = (dispatch: DispatchType) => (e: CallbackEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const options = Object.fromEntries([...formData.entries()]);

    function handle(text: string) {
        dispatch({ type: T.FormActionType.ShowStatus, text: text });
    }

    dispatch({ type: T.FormActionType.Submit, options: options, handle });
}

export { submitCallback };
