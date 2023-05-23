"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const User_1 = require("./User");
const userData = {
    dob: new Date('2022-07-02'),
    email: 'taya@gmail.com',
    firstName: 'Taya',
    isOnline: true,
    lastName: 'Akhenda',
    password: 'Taya2022',
    phone: '+254 01010101',
    status: 'ready',
    username: 'taya',
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
describe('Mongoose Model Class Extended Tests', () => {
    const Model = new User_1.User();
    const UserModel = Model.build(mongoose_1.default, 'User');
    describe('Creating records', () => {
        it('saves a user', async () => {
            const taya = new UserModel(userData);
            expect(taya.likes).toBe(0);
            await taya.save();
            expect(taya.likes).toBe(1);
            expect(taya.isNew).toBeFalse();
        });
    });
    describe('Reading records', () => {
        it('finds all users with the name Taya', async () => {
            const taya = await UserModel.create(userData);
            const users = await UserModel.find({ firstName: 'Taya' });
            expect(users[0]?.id).toEqual(taya.id);
        });
        it('finds a user with a particular id', async () => {
            const taya = await UserModel.create(userData);
            // eslint-disable-next-line no-underscore-dangle
            const user = await UserModel.findOne({ _id: taya._id });
            expect(user?.fullname).toBe('Taya Akhenda');
        });
    });
    describe('Updating records', () => {
        it('updates a user with the $inc operator', async () => {
            const taya = await UserModel.create(userData);
            await UserModel.updateOne({ _id: taya._id }, { $inc: { likes: 10 } });
            const user = await UserModel.findOne({ _id: taya._id });
            expect(user?.likes).toEqual(10);
        });
    });
    describe('Deleting records', () => {
        it('removes a user', async () => {
            const taya = await UserModel.create(userData);
            await taya.remove();
            const user = await UserModel.findOne({ lastName: 'Akhenda' });
            expect(user).toBeNull();
        });
    });
});
//# sourceMappingURL=User.extended.spec.js.map