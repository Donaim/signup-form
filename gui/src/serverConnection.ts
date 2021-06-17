
/* This is a hack that simplifies testing.
 * Basically, the pastebin is our DNS. */
const SERVER_ADDRESS_PROMISE =
      fetch("https://pastebin.com/raw/szEDkaxU")
      .then(response => response.text());

const sendServerRequest = async (path: string, options: any) => {
    /* TODO: support options */
    const SERVER_ADDRESS = await SERVER_ADDRESS_PROMISE;
    const r = await fetch(SERVER_ADDRESS + '/' + path);
    const text = await r.text();
    return text;
}

export { sendServerRequest };





