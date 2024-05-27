/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import { dropCollections, dropDatabase, setUp } from './db';
import { User } from './User';

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
  beforeAll(async () => {
    await setUp();
  });

  afterEach(async () => {
    await dropCollections();
  });

  afterAll(async () => {
    await dropDatabase();
  });

  describe('Mongoose Model Class tests', () => {
    const modelUser = new User().build('User');

    it('builds model', () => {
      expect(modelUser.name).toBe('model');
      expect(modelUser.modelName).toBe('User');
    });

    it('creates document', async () => {
      const docUser = await modelUser.create(userData);
      const password = docUser.password || '';

      expect(bcrypt.compareSync('20145', password)).toBeTrue();
    });

    it('calls static methods', async () => {
      const docUser = await modelUser.create(userData);
      const doc = await modelUser.getById(docUser.id);

      expect(doc).toBeDefined();
      expect(doc.firstName).toBe('Ernesto');
    });

    it('calls instance methods', async () => {
      const docUser = await modelUser.create(userData);

      expect(docUser.enabled).toBeTrue();
      expect(docUser.status).toBe('ready');

      const result = await docUser.disable();
      expect(result).toBeDefined();
      expect(result.acknowledged).toBeTrue();
      expect(result.matchedCount).toBe(1);

      const docUser2 = await modelUser.findById(docUser.id);

      expect(docUser2).toBeDefined();
      expect(docUser2?.enabled).toBeFalse();
      expect(docUser2?.status).toBe('disabled');
      expect(docUser2?.isOnline).toBeTrue();

      await docUser2?.signOff();

      const docUser3 = await modelUser.getById(docUser.id);

      expect(docUser3).toBeDefined();
      expect(docUser3.enabled).toBeFalse();
      expect(docUser3.isOnline).toBeFalse();
      expect(docUser3.status).toBe('disabled');
    });

    it('calls virtual methods', async () => {
      const originalName = 'Ernesto Rojas';
      const newName = 'Hera Akhenda';
      const docUser = await modelUser.create(userData);

      expect(docUser.fullname).toBe(originalName);

      docUser.fullname = newName;

      await docUser.save();

      expect(docUser.fullname).toBe(newName);
      expect(docUser.firstName).toBe('Hera');
      expect(docUser.lastName).toBe('Akhenda');
    });

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

      const docUsers = await modelUser.create(users);
      const result = await modelUser.paginate({}, { limit: 3, page: 2 });

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
  });
});
