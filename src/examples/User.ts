import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

import { DerivedClassModel, DerivedDocument } from '../types';
import MongooseModelClass from '..';

export class User extends MongooseModelClass<typeof User> {
  static async getById(this: DerivedClassModel<User, typeof User>, id: string) {
    const user = await this.findById(id);

    if (!user) throw new Error('User not found.');

    return user;
  }

  options() {
    return {};
  }

  schema() {
    return new Schema({
      address: String,
      dob: { required: true, type: Date },
      email: { required: true, type: String },
      enabled: { default: true, type: Boolean },
      favouriteFood: { enum: ['chapati', 'rice', 'ugali', 'fish', 'mukimo'], type: String },
      firstName: { required: true, type: String },
      isOnline: { required: true, type: Boolean },
      lastName: { required: false, type: String },
      likes: { default: 0, type: Number },
      password: { required: true, type: String },
      phone: { required: true, type: String },
      status: {
        enum: ['ready', 'processing', 'done', 'failed', 'canceled'],
        required: true,
        type: String,
      },
      username: { required: true, type: String },
    });
  }

  beforeSave(doc: DerivedDocument<User>, next) {
    if (doc.password) doc.password = bcrypt.hashSync(doc.password, 10);

    next();
  }

  afterSave(doc: DerivedDocument<User>, next): void {
    doc.likes += 1;

    next();
  }

  get fullname() {
    const self = this as DerivedDocument<User>;

    return `${self.firstName} ${self.lastName}`;
  }

  set fullname(value: string) {
    const self = this as DerivedDocument<User>;
    const [firstName, lastName] = value.split(' ');

    if (firstName) self.firstName = firstName;
    if (lastName) self.lastName = lastName;
  }

  async signOff(this: DerivedDocument<User>) {
    await this.updateOne({ isOnline: false });
  }

  async disable(this: DerivedDocument<User>) {
    const result = await this.updateOne({ enabled: false });

    return result;
  }
}
