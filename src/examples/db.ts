/* eslint-disable security/detect-object-injection */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import cachegoose from 'recachegoose';

let mongod: MongoMemoryServer | undefined;

export async function setUp(cache = false) {
  // await mongoose.connect('mongodb://127.0.0.1/mongoose-model-class');
  mongod = await MongoMemoryServer.create();

  if (cache) cachegoose(mongoose, {});

  await mongoose.connect(mongod.getUri());
}

export async function dropDatabase() {
  if (!mongod) return;

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect();
  await mongod.stop();
}

export async function dropCollections() {
  if (!mongod) return;

  const { collections } = mongoose.connection;

  // eslint-disable-next-line guard-for-in
  for (const key in collections) {
    const collection = collections[key];

    await collection.deleteMany({});
  }
}
