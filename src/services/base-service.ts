import dbConnection from "../connections/mongodb-connection";

export abstract class BaseService<C, I, Q, P> {
  async insertOne(collectionName: C, item: I): Promise<any> {
    try {
      return await dbConnection
        .getMongoDb()
        .collection(collectionName)
        .insertOne(item);
    } catch (error) {
      throw error;
    }
  }
  async findOne(collectionName: C, query: any, project?: P): Promise<any> {
    console.log("qq", query);

    try {
      return await dbConnection
        .getMongoDb()
        .collection(collectionName)
        .findOne(query.condition, { projection: project || null });
    } catch (error) {
      throw error;
    }
  }
}
