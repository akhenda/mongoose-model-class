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
/* eslint-disable import/no-extraneous-dependencies */
const faker_1 = require("@faker-js/faker");
const noop_1 = __importDefault(require("lodash/noop"));
const mongoose_1 = __importDefault(require("mongoose"));
const recachegoose_1 = __importDefault(require("recachegoose"));
const db_1 = require("./db");
const User_1 = require("./User");
const userData = {
    dob: new Date(),
    email: 'taya@gmail.com',
    firstName: 'Taya',
    isOnline: false,
    lastName: 'Akhenda',
    password: 'Taya2022',
    phone: '+254 01010101',
    status: 'ready',
    username: 'taya',
};
describe('User Extended', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.setUp)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropCollections)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropDatabase)();
    }));
    describe('Mongoose Model Class Extended Tests', () => {
        const UserModel = new User_1.User().build('User');
        describe('Creating records', () => {
            it('saves a user', () => __awaiter(void 0, void 0, void 0, function* () {
                const taya = new UserModel(userData);
                expect(taya.likes).toBe(0);
                yield taya.save();
                expect(taya.likes).toBe(1);
                expect(taya.isNew).toBeFalse();
            }));
        });
        describe('Reading records', () => {
            it('finds all users with the name Taya', () => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const taya = yield UserModel.create(userData);
                const users = yield UserModel.find({ firstName: 'Taya' });
                expect((_a = users[0]) === null || _a === void 0 ? void 0 : _a.id).toStrictEqual(taya.id);
            }));
            it('finds a user with a particular id', () => __awaiter(void 0, void 0, void 0, function* () {
                const taya = yield UserModel.create(userData);
                const user = yield UserModel.findOne({ _id: taya._id });
                expect(user === null || user === void 0 ? void 0 : user.fullname).toBe('Taya Akhenda');
            }));
        });
        describe('Updating records', () => {
            it('updates a user with the $inc operator', () => __awaiter(void 0, void 0, void 0, function* () {
                const taya = yield UserModel.create(userData);
                yield UserModel.updateOne({ _id: taya._id }, { $inc: { likes: 10 } });
                const user = yield UserModel.getById(taya._id);
                expect(user).toBeDefined();
                expect(user.likes).toBe(10);
            }));
        });
        describe('Deleting records', () => {
            it('removes a user', () => __awaiter(void 0, void 0, void 0, function* () {
                const taya = yield UserModel.create(userData);
                expect(taya).not.toBeNull();
                yield taya.deleteOne();
                const user = yield UserModel.findOne({ lastName: 'Akhenda' });
                expect(user).toBeNull();
            }));
        });
    });
});
describe('User Extended + Pagination', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.setUp)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropCollections)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropDatabase)();
    }));
    describe('Mongoose Model Class Extended Tests with Pagination', () => {
        const UserModel = new User_1.User().build('UserPaginated');
        describe('Reading records', () => {
            it('paginates records', () => __awaiter(void 0, void 0, void 0, function* () {
                // generate 10 users
                const users = new Array(10).fill(null).map(() => {
                    const firstName = faker_1.faker.person.firstName();
                    const lastName = faker_1.faker.person.lastName();
                    const email = faker_1.faker.internet.email({ firstName, lastName });
                    const dob = faker_1.faker.date.birthdate();
                    const isOnline = faker_1.faker.number.int({ max: 100 }) > 50;
                    const password = faker_1.faker.string.alphanumeric(5);
                    const phone = faker_1.faker.phone.number();
                    const status = faker_1.faker.number.int({ max: 100 }) > 60 ? 'done' : 'ready';
                    const username = faker_1.faker.internet.userName({ firstName, lastName });
                    return { dob, email, firstName, isOnline, lastName, password, phone, status, username };
                });
                const docUsers = yield UserModel.create(users);
                const result = yield UserModel.paginate({}, { limit: 3, page: 2 });
                expect(docUsers).toHaveLength(10);
                expect(result.totalDocs).toBe(10);
                expect(result.docs).toBeDefined();
                expect(result.docs).toHaveLength(3);
                expect(result.limit).toBe(3);
                expect(result.page).toBe(2);
                expect(result.totalPages).toBe(4);
                expect(result.hasPrevPage).toBeTrue();
                expect(result.hasNextPage).toBeTrue();
                expect(result.prevPage).toBe(1);
                expect(result.nextPage).toBe(3);
            }));
            it('aggregates & paginates records', () => __awaiter(void 0, void 0, void 0, function* () {
                // generate 10 users
                const users = new Array(10).fill(null).map((_, index) => {
                    const firstName = faker_1.faker.person.firstName();
                    const lastName = faker_1.faker.person.lastName();
                    const email = faker_1.faker.internet.email({ firstName, lastName });
                    const dob = faker_1.faker.date.birthdate();
                    const isOnline = index > 3;
                    const password = faker_1.faker.string.alphanumeric(5);
                    const phone = faker_1.faker.phone.number();
                    const status = faker_1.faker.number.int({ max: 100 }) > 60 ? 'done' : 'ready';
                    const username = faker_1.faker.internet.userName({ firstName, lastName });
                    return { dob, email, firstName, isOnline, lastName, password, phone, status, username };
                });
                const docUsers = yield UserModel.create(users);
                const result = yield UserModel.aggregatePaginate(UserModel.aggregate([{ $match: { isOnline: true } }]), {
                    limit: 2,
                    page: 1,
                });
                expect(docUsers).toHaveLength(10);
                expect(result.totalDocs).toBe(6);
                expect(result.docs).toBeDefined();
                expect(result.docs).toHaveLength(2);
                expect(result.limit).toBe(2);
                expect(result.page).toBe(1);
                expect(result.totalPages).toBe(3);
                expect(result.hasPrevPage).toBeFalse();
                expect(result.hasNextPage).toBeTrue();
                expect(result.prevPage).toBeNull();
                expect(result.nextPage).toBe(2);
            }));
        });
    });
});
describe('User Extended + Caching', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.setUp)(true);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropCollections)();
        recachegoose_1.default.clearCache(null, noop_1.default);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropDatabase)();
    }));
    describe('Mongoose Model Class Extended Tests with CacheGoose', () => {
        const UserModel = new User_1.User().build('UserCached');
        // generate 10 users
        function createUsers(amount = 10) {
            return UserModel.create(Array(amount)
                .fill(null)
                .map(() => {
                const firstName = faker_1.faker.person.firstName();
                const lastName = faker_1.faker.person.lastName();
                const email = faker_1.faker.internet.email({ firstName, lastName });
                const dob = faker_1.faker.date.birthdate();
                const isOnline = faker_1.faker.number.int({ max: 100 }) > 50;
                const password = faker_1.faker.string.alphanumeric(5);
                const phone = faker_1.faker.phone.number();
                const status = faker_1.faker.number.int({ max: 100 }) > 60 ? 'done' : 'ready';
                const username = faker_1.faker.internet.userName({ firstName, lastName });
                return { dob, email, firstName, isOnline, lastName, password, phone, status, username };
            }));
        }
        function getAllUsers(ttl) {
            return UserModel.find({}).cache(ttl).exec();
        }
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createUsers();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield UserModel.deleteMany({});
            recachegoose_1.default.clearCache(null, noop_1.default);
        }));
        it('throws an error if the hydrate method does not exist', () => {
            const mon = { Model: {} };
            expect(() => (0, recachegoose_1.default)(mon, {})).toThrow('Cachegoose is only compatible with versions of mongoose that implement the `model.hydrate` method');
        });
        it('does not throw an error if the hydrate method exists', () => {
            expect(() => (0, recachegoose_1.default)(mongoose_1.default, {})).toBeFunction();
        });
        it('have cache method after initialization', () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(UserModel.find({}).cache).toBeFunction();
        });
        it('caches a simple query that uses promises', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield getAllUsers(60);
            expect(result).toHaveLength(10);
            yield createUsers(10);
            const cachedResult = yield getAllUsers(60);
            expect(cachedResult).toHaveLength(10);
            recachegoose_1.default.clearCache(null, noop_1.default);
            const freshResult = yield getAllUsers(60);
            expect(freshResult).toHaveLength(20);
        }));
    });
});
//# sourceMappingURL=User.extended.spec.js.map