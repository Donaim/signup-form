
const express = require('express');
const app = express();
const port = 3001;

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/create-event', (req, res) => {
    res.send({ id: req.databaseid });
});

function start() {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

module.exports = {
    app: app,
    start: start,
};
