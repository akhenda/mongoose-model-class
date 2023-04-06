/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo;

export async function setUp() {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url);
}

export async function dropDatabase() {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
}

export async function dropCollections() {
  if (mongo) {
    const { collections } = mongoose.connection;

    for (const key in collections) {
      const collection = collections[key];
      // eslint-disable-next-line no-await-in-loop
      await collection?.deleteMany({});
    }
  }
}
