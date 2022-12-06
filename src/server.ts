import App from "./loaders/app";
import express, { Application } from "express";
import dbConnection from "./connections/mongodb-connection";
import { router } from "./routes";
const app: Application = express();
new App(app).init();

app.use("/api", router);

dbConnection.initMongoDb((error: Error, dbObj?: any) => {
  if (error) {
    console.log(error);
  } else {
    const server = app.listen(3000, () => {
      const { address, port } = <any>server.address();
      console.log(`Listening at http://${address}:${port}`);
    });
  }
});
