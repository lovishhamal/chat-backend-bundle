import cors from "cors";
import { router } from "../routes";
// import { swagger } from '../configs';
import express, { Application, Response } from "express";
// import { dbInstance } from '../connections';

class App {
  constructor(private app: Application) {}

  init() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(express.json({ limit: "50mb" })); //, extended: true
    this.app.use(express.static(__dirname + "/"));
    this.app.use("/api", router);
  }
}

export default App;
