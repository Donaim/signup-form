
/* dynamicState is for passing
 * hooks inside mocked objects */

const dynamicState: { [key: string]: any } = {};

function getDynamic(name: string) {
    return dynamicState[name];
}

function setDynamic(name: string, value: unknown, body: () => unknown) {
    const previous = dynamicState[name];
    try {
        dynamicState[name] = value;
        return body();
    } finally {
        dynamicState[name] = previous;
    }
}

export { getDynamic, setDynamic };
