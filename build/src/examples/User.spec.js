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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const User_1 = require("./User");
const userData = {
    dob: new Date(),
    email: 'ernesto20145@gmail.com',
    firstName: 'Ernesto',
    isOnline: true,
    lastName: 'Rojas',
    password: '20145',
    phone: '+56 945472812',
    status: 'ready',
    username: 'ernestojr',
};
describe('User', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.setUp)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropCollections)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.dropDatabase)();
    }));
    describe('Mongoose Model Class tests', () => {
        const modelUser = new User_1.User().build('User');
        it('builds model', () => {
            expect(modelUser.name).toBe('model');
            expect(modelUser.modelName).toBe('User');
        });
        it('creates document', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUser = yield modelUser.create(userData);
            const password = docUser.password || '';
            expect(bcrypt_1.default.compareSync('20145', password)).toBeTrue();
        }));
        it('calls static methods', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUser = yield modelUser.create(userData);
            const doc = yield modelUser.getById(docUser.id);
            expect(doc).toBeDefined();
            expect(doc.firstName).toBe('Ernesto');
        }));
        it('calls instance methods', () => __awaiter(void 0, void 0, void 0, function* () {
            const docUser = yield modelUser.create(userData);
            expect(docUser.enabled).toBeTrue();
            expect(docUser.status).toBe('ready');
            const result = yield docUser.disable();
            expect(result).toBeDefined();
            expect(result.acknowledged).toBeTrue();
            expect(result.matchedCount).toBe(1);
            const docUser2 = yield modelUser.findById(docUser.id);
            expect(docUser2).toBeDefined();
            expect(docUser2 === null || docUser2 === void 0 ? void 0 : docUser2.enabled).toBeFalse();
            expect(docUser2 === null || docUser2 === void 0 ? void 0 : docUser2.status).toBe('disabled');
            expect(docUser2 === null || docUser2 === void 0 ? void 0 : docUser2.isOnline).toBeTrue();
            yield (docUser2 === null || docUser2 === void 0 ? void 0 : docUser2.signOff());
            const docUser3 = yield modelUser.getById(docUser.id);
            expect(docUser3).toBeDefined();
            expect(docUser3 === null || docUser3 === void 0 ? void 0 : docUser3.enabled).toBeFalse();
            expect(docUser3 === null || docUser3 === void 0 ? void 0 : docUser3.isOnline).toBeFalse();
            expect(docUser3 === null || docUser3 === void 0 ? void 0 : docUser3.status).toBe('disabled');
        }));
        it('calls virtual methods', () => __awaiter(void 0, void 0, void 0, function* () {
            const originalName = 'Ernesto Rojas';
            const newName = 'Hera Akhenda';
            const docUser = yield modelUser.create(userData);
            expect(docUser.fullname).toBe(originalName);
            docUser.fullname = newName;
            yield docUser.save();
            expect(docUser.fullname).toBe(newName);
            expect(docUser.firstName).toBe('Hera');
            expect(docUser.lastName).toBe('Akhenda');
        }));
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
            const docUsers = yield modelUser.create(users);
            const result = yield modelUser.paginate({}, { limit: 3, page: 2 });
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
    });
});
//# sourceMappingURL=User.spec.js.map