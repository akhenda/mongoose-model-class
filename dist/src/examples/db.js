"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollections = exports.dropDatabase = exports.setUp = void 0;
/* eslint-disable security/detect-object-injection */
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const recachegoose_1 = __importDefault(require("recachegoose"));
let mongod;
function setUp() {
    return __awaiter(this, arguments, void 0, function* (cache = false) {
        // await mongoose.connect('mongodb://127.0.0.1/mongoose-model-class');
        mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
        if (cache)
            (0, recachegoose_1.default)(mongoose_1.default, {});
        yield mongoose_1.default.connect(mongod.getUri());
    });
}
exports.setUp = setUp;
function dropDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongod)
            return;
        yield mongoose_1.default.connection.dropDatabase();
        yield mongoose_1.default.connection.close();
        yield mongoose_1.default.disconnect();
        yield mongod.stop();
    });
}
exports.dropDatabase = dropDatabase;
function dropCollections() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongod)
            return;
        const { collections } = mongoose_1.default.connection;
        // eslint-disable-next-line guard-for-in
        for (const key in collections) {
            const collection = collections[key];
            yield (collection === null || collection === void 0 ? void 0 : collection.deleteMany({}));
        }
    });
}
exports.dropCollections = dropCollections;
//# sourceMappingURL=db.js.map