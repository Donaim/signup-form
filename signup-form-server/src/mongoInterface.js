
const MongoDB = require('./mongoDriver').getMongo();
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const url = "mongodb://localhost:27017";

var clientSave = null;
const getClient = async () => {
    if (!clientSave) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        clientSave = await MongoClient.connect(url, options);
        console.log("MongoDB connection established!");
    }

    return clientSave;
}

const insertEvent = async (first_name, last_name, email, date) => {
    const client = await getClient();
    const db = client.db("signup-form-db");

    const id = new ObjectID().toHexString();
    const doc = {
        _id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        date: date,
    };

    const result = await db.collection('events').insertOne(doc);
    if (!result.result.ok) {
        throw 'Not cool';
    }

    return id;
}

const ping = async () => {
    await getClient();
}

const logout = async () => {
    const client = await getClient();
    client.close();
}

module.exports = {
    ping: ping,
    insertEvent: insertEvent,
    logout: logout,
};
