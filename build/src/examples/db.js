"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollections = exports.dropDatabase = exports.setUp = void 0;
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongo;
async function setUp() {
    mongo = await mongodb_memory_server_1.MongoMemoryServer.create();
    const url = mongo.getUri();
    await mongoose_1.default.connect(url);
}
exports.setUp = setUp;
async function dropDatabase() {
    if (mongo) {
        await mongoose_1.default.connection.dropDatabase();
        await mongoose_1.default.connection.close();
        await mongo.stop();
    }
}
exports.dropDatabase = dropDatabase;
async function dropCollections() {
    if (mongo) {
        const { collections } = mongoose_1.default.connection;
        for (const key in collections) {
            const collection = collections[key];
            // eslint-disable-next-line no-await-in-loop
            await collection?.deleteMany({});
        }
    }
}
exports.dropCollections = dropCollections;
//# sourceMappingURL=db.js.map