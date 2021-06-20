
const express = require('express');
const app = express();
const port = 3001;

app.get('/ping', (req, res) => {
    res.send('pong');
});

function start() {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

module.exports = {
    app: app,
    start: start,
};
