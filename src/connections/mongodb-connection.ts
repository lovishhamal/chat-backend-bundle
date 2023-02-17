import { MongoClient } from "mongodb";

const username = encodeURIComponent("Lovish");
const password = encodeURIComponent("<password>");

const mongoDbUrl =
  `mongodb+srv://${username}:${password}%12@cluster0.agvoa.mongodb.net/?retryWrites=true&w=majority&ssl=true` ||
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
  console.log("db initialized");
  
  return _db;
};

export default {
  initMongoDb,
  getMongoDb,
};
