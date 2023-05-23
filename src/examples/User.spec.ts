import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { dropCollections, dropDatabase, setUp } from './db';
import { User } from './User';

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
  await setUp();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});

describe('Mongoose Model Class tests', () => {
  const user = new User();
  const modelUser = user.build<typeof User>(mongoose, 'User');

  it('Should build model', async () => {
    expect(modelUser.name).toBe('model');
    expect(modelUser.modelName).toBe('User');
  });

  it('Should create document', async () => {
    const docUser = await modelUser.create(userData);
    const password = docUser.password || '';

    expect(bcrypt.compareSync('20145', password)).toBeTrue();
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
