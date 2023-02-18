import { MongoClient } from "mongodb";

const username = encodeURIComponent("Lovish");
const password = encodeURIComponent("w@rtropius12");

const mongoDbUrl =
  `mongodb://${username}:${password}@cluster0-shard-00-00.agvoa.mongodb.net:27017,cluster0-shard-00-01.agvoa.mongodb.net:27017,cluster0-shard-00-02.agvoa.mongodb.net:27017/?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority` ||
  `mongodb://localhost:27017`;

let _db: any;

const initMongoDb = (callback: any) => {
  if (_db) {
    console.log("DB initialized");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl)
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

  return _db;
};

export default {
  initMongoDb,
  getMongoDb,
};
