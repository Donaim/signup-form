
function handleCreateEvent(req, res, next) {
    /* TODO: implement database connection */
    req.databaseid = null;
    next();
}

function getRequestId(req) {
    return req.databaseid;
}

module.exports = {
    handleCreateEvent: handleCreateEvent,
    getRequestId: getRequestId,
};

