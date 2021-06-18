
/* This is a hack that simplifies testing.
 * Basically, the pastebin is our DNS. */
const SERVER_ADDRESS_PROMISE =
      fetch("https://pastebin.com/raw/szEDkaxU")
      .then(response => response.text());

const sendServerRequest = async (path: string, options: object) => {
    const SERVER_ADDRESS = await SERVER_ADDRESS_PROMISE;

    let query = '';
    if (options) {
        query = '?' + Object.entries(options)
            .map(x => encodeURIComponent(x[0]) + '=' + encodeURIComponent(x[1].toString()))
            .join('&');
    }

    const r = await fetch(SERVER_ADDRESS + '/' + path + query);
    const text = await r.text();
    return text;
}

export { sendServerRequest };





