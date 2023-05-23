"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const User_1 = require("./User");
const userData = {
    dob: new Date('2001-02-05'),
    email: 'ernesto20145@gmail.com',
    firstName: 'Ernesto',
    isOnline: true,
    lastName: 'Rojas',
    password: '20145',
    phone: '+56 945472812',
    status: 'ready',
    username: 'ernestojr',
};
beforeAll(async () => {
    await (0, db_1.setUp)();
});
afterEach(async () => {
    await (0, db_1.dropCollections)();
});
afterAll(async () => {
    await (0, db_1.dropDatabase)();
});
describe('Mongoose Model Class tests', () => {
    const user = new User_1.User();
    const modelUser = user.build(mongoose_1.default, 'User');
    it('Should build model', async () => {
        expect(modelUser.name).toBe('model');
        expect(modelUser.modelName).toBe('User');
    });
    it('Should create document', async () => {
        const docUser = await modelUser.create(userData);
        const password = docUser.password || '';
        expect(bcrypt_1.default.compareSync('20145', password)).toBeTrue();
    });
    it('Should call static method', async () => {
        const docUser = await modelUser.create(userData);
        const doc = await modelUser.getById(docUser.id);
        expect(doc).toBeDefined();
        expect(doc.firstName).toBe('Ernesto');
    });
    it('Should call instance method', async () => {
        const docUser = await modelUser.create(userData);
        const result = await docUser.disable();
        const docUser2 = await modelUser.findById(docUser.id);
        expect(docUser.enabled).toBeTrue();
        expect(result).toBeTruthy();
        expect(result.acknowledged).toBeTrue();
        expect(result.matchedCount).toBe(1);
        expect(docUser2?.enabled).toBeFalse();
    });
    it('Should call virtual method', async () => {
        const originalName = 'Ernesto Rojas';
        const newName = 'Hera Akhenda';
        const docUser = await modelUser.create(userData);
        // @ts-ignore
        expect(docUser.fullname).toBe(originalName);
        // @ts-ignore
        docUser.fullname = newName;
        await docUser.save();
        // @ts-ignore
        expect(docUser.fullname).toBe(newName);
        expect(docUser.firstName).toBe('Hera');
        expect(docUser.lastName).toBe('Akhenda');
    });
});
//# sourceMappingURL=User.spec.js.map