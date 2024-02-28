import { MongoClient } from "mongodb";

const username = encodeURIComponent(process.env.USERNAME);
const password = encodeURIComponent(process.env.PASSWORDen);

const mongo = process.env.MONGO_URI?.replace("username", username).replace(
  "password",
  password
);
const mongoDbUrl = `mongodb://localhost:27017`;

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
