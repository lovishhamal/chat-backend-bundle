"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const username = encodeURIComponent("Lovish");
const password = encodeURIComponent("w@rtropius12");
const mongoDbUrl = `mongodb://${username}:${password}@cluster0-shard-00-00.agvoa.mongodb.net:27017,cluster0-shard-00-01.agvoa.mongodb.net:27017,cluster0-shard-00-02.agvoa.mongodb.net:27017/?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority` ||
    `mongodb://localhost:27017`;
let _db;
const initMongoDb = (callback) => {
    if (_db) {
        console.log("DB initialized");
        return callback(null, _db);
    }
    mongodb_1.MongoClient.connect(mongoDbUrl)
        .then((client) => {
        _db = client.db("dwf");
        callback(null, _db);
    })
        .catch((error) => {
        callback(error);
    });
};
const getMongoDb = () => {
    if (!_db) {
        throw Error("Database not initialzed");
    }
    console.log("db initialized");
    return _db;
};
exports.default = {
    initMongoDb,
    getMongoDb,
};
//# sourceMappingURL=mongodb-connection.js.map