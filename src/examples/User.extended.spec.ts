/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import noop from 'lodash/noop';
import mongoose from 'mongoose';
import cachegoose from 'recachegoose';

import { dropCollections, dropDatabase, setUp } from './db';
import { User } from './User';

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
  beforeAll(async () => {
    await setUp();
  });

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  describe('Mongoose Model Class Extended Tests', () => {
    const UserModel = new User().build('User');

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

        expect(users[0]?.id).toStrictEqual(taya.id);
      });

      it('finds a user with a particular id', async () => {
        const taya = await UserModel.create(userData);
        const user = await UserModel.findOne({ _id: taya._id });

        expect(user?.fullname).toBe('Taya Akhenda');
      });
    });

    describe('Updating records', () => {
      it('updates a user with the $inc operator', async () => {
        const taya = await UserModel.create(userData);

        await UserModel.updateOne({ _id: taya._id }, { $inc: { likes: 10 } });
        const user = await UserModel.getById(taya._id);

        expect(user).toBeDefined();
        expect(user?.likes).toBe(10);
      });
    });

    describe('Deleting records', () => {
      it('removes a user', async () => {
        const taya = await UserModel.create(userData);

        expect(taya).not.toBeNull();

        await taya.deleteOne();

        const user = await UserModel.findOne({ lastName: 'Akhenda' });

        expect(user).toBeNull();
      });
    });
  });
});

describe('User Extended + Pagination', () => {
  beforeAll(async () => {
    await setUp();
  });

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  describe('Mongoose Model Class Extended Tests with Pagination', () => {
    const UserModel = new User().build('UserPaginated');

    describe('Reading records', () => {
      it('paginates records', async () => {
        // generate 10 users
        const users = new Array(10).fill(null).map(() => {
          const firstName = faker.person.firstName();
          const lastName = faker.person.lastName();
          const email = faker.internet.email({ firstName, lastName });
          const dob = faker.date.birthdate();
          const isOnline = faker.number.int({ max: 100 }) > 50;
          const password = faker.string.alphanumeric(5);
          const phone = faker.phone.number();
          const status = faker.number.int({ max: 100 }) > 60 ? 'done' : 'ready';
          const username = faker.internet.userName({ firstName, lastName });

          return { dob, email, firstName, isOnline, lastName, password, phone, status, username };
        });

        const docUsers = await UserModel.create(users);
        const result = await UserModel.paginate({}, { limit: 3, page: 2 });

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
      });

      it('aggregates & paginates records', async () => {
        // generate 10 users
        const users = new Array(10).fill(null).map((_, index) => {
          const firstName = faker.person.firstName();
          const lastName = faker.person.lastName();
          const email = faker.internet.email({ firstName, lastName });
          const dob = faker.date.birthdate();
          const isOnline = index > 3;
          const password = faker.string.alphanumeric(5);
          const phone = faker.phone.number();
          const status = faker.number.int({ max: 100 }) > 60 ? 'done' : 'ready';
          const username = faker.internet.userName({ firstName, lastName });

          return { dob, email, firstName, isOnline, lastName, password, phone, status, username };
        });

        const docUsers = await UserModel.create(users);
        const result = await UserModel.aggregatePaginate(UserModel.aggregate([{ $match: { isOnline: true } }]), {
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
      });
    });
  });
});

describe('User Extended + Caching', () => {
  beforeAll(async () => {
    await setUp(true);
  });

  afterEach(async () => {
    await dropCollections();

    cachegoose.clearCache(null, noop);
  });

  afterAll(async () => {
    await dropDatabase();
  });

  describe('Mongoose Model Class Extended Tests with CacheGoose', () => {
    const UserModel = new User().build('UserCached');

    // generate 10 users
    function createUsers(amount = 10) {
      return UserModel.create(
        Array(amount)
          .fill(null)
          .map(() => {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            const email = faker.internet.email({ firstName, lastName });
            const dob = faker.date.birthdate();
            const isOnline = faker.number.int({ max: 100 }) > 50;
            const password = faker.string.alphanumeric(5);
            const phone = faker.phone.number();
            const status = faker.number.int({ max: 100 }) > 60 ? 'done' : 'ready';
            const username = faker.internet.userName({ firstName, lastName });

            return { dob, email, firstName, isOnline, lastName, password, phone, status, username };
          }),
      );
    }

    function getAllUsers(ttl?: number) {
      return UserModel.find({}).cache(ttl).exec();
    }

    beforeEach(async () => {
      await createUsers();
    });

    afterEach(async () => {
      await UserModel.deleteMany({});

      cachegoose.clearCache(null, noop);
    });

    it('throws an error if the hydrate method does not exist', () => {
      const mon = { Model: {} } as typeof mongoose;

      expect(() => cachegoose(mon, {})).toThrow(
        'Cachegoose is only compatible with versions of mongoose that implement the `model.hydrate` method',
      );
    });

    it('does not throw an error if the hydrate method exists', () => {
      expect(() => cachegoose(mongoose, {})).toBeFunction();
    });

    it('have cache method after initialization', () => {
      expect(UserModel.find({}).cache).toBeFunction();
    });

    it('caches a simple query that uses promises', async () => {
      const result = await getAllUsers(60);
      expect(result).toHaveLength(10);

      await createUsers(10);

      const cachedResult = await getAllUsers(60);
      expect(cachedResult).toHaveLength(10);

      cachegoose.clearCache(null, noop);

      const freshResult = await getAllUsers(60);
      expect(freshResult).toHaveLength(20);
    });
  });
});
