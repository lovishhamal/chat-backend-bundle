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
    try {
      return await dbConnection
        .getMongoDb()
        .collection(collectionName)
        .findOne(query.condition, { projection: project || null });
    } catch (error) {
      throw error;
    }
  }

  async findAll(collectionName: C, query?: any, project?: P): Promise<any> {
    try {
      return await dbConnection
        .getMongoDb()
        .collection(collectionName)
        .find(query.condition)
        .project(project || null)
        .collation({ locale: "en", strength: 1 })
        .limit(+query.limit ?? 25)
        .skip(+query.offset ?? 0)
        .sort(query.sort)
        .toArray();
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(
    collectionName: C,
    query?: any,
    project?: P
  ): Promise<any> {
    try {
      return await dbConnection
        .getMongoDb()
        .collection(collectionName)
        .findOneAndUpdate(query.id, query.condition, { upsert: true });
    } catch (error) {
      throw error;
    }
  }
}
