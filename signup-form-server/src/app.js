
const express = require('express');
const validator = require('./validate');
const database = require('./database');

const app = express();
const port = 3001;

app.get('/ping', (req, res) => {
    res.send('pong');
});

const createEventValidationRule = {
    "first_name": "required|string|max:20",
    "last_name": "required|string|max:20",
    "email": "required|email|max:100",
    "date": "required|date",
};

const validateCreateEvent = (req, res, next) => {
    validator(req.query, createEventValidationRule, {}, (err, status) => {
        if (status) {
            next();
        } else {
            res.status(412).send({
                error: 'Invalid inputs:' +
                    Object.entries(err.errors).map(x => ' ' + x[0].toString()).toString()
            });
        }
    });
}

app.get('/create-event', [validateCreateEvent, database.handleCreateEvent], (req, res) => {
    res.send({ id: database.getRequestId(req) });
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
