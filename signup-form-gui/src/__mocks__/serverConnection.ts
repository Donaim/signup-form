
import { getDynamic } from '../dynamicState';

const sendServerRequest = async (path: string, options: object) => {
    const hook = getDynamic('sendServerRequestHook');
    hook && hook(path, options);
    return JSON.stringify({ id: "example-id" });
}

export { sendServerRequest };
