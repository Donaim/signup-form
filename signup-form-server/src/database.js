
const mongo = require('./mongoInterface');

async function handleCreateEvent(req, res, next) {
    const query = req.query;

    try {
        const id = await mongo.insertEvent(query.first_name,
                                           query.last_name,
                                           query.email,
                                           query.date);
        req.databaseid = id;
        next();
    } catch (err) {
        console.log("Database failure:", err);
        res.status(500).send({ error: 'Database failure' });
    }
}

function getRequestId(req) {
    return req.databaseid;
}

module.exports = {
    handleCreateEvent: handleCreateEvent,
    getRequestId: getRequestId,
};

