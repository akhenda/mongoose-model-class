import bcrypt from 'bcrypt';

import { MongooseModelClassDocumentType, MongooseModelClassReturnModelType } from '../types';
import MongooseModelClass from '..';

export class User extends MongooseModelClass<typeof User> {
  static async getById(this: MongooseModelClassReturnModelType<User>, id: string) {
    const user = await this.findById(id);

    if (!user) throw new Error('User not found.');

    return user;
  }

  schema() {
    return {
      email: { required: true, type: String },
      firstName: { required: true, type: String },
      lastName: { required: true, type: String },
      likes: { default: 0, type: Number },
      password: { required: true, type: String },
      phone: { required: true, type: String },
      status: { default: true, type: Boolean },
      username: { required: true, type: String },
    };
  }

  beforeSave(doc: MongooseModelClassDocumentType<User>, next) {
    if (doc.password) doc.password = bcrypt.hashSync(doc.password, 10);

    next();
  }

  afterSave(doc: MongooseModelClassDocumentType<User>, next): void {
    doc.likes += 1;

    next();
  }

  get fullname() {
    const self = this as MongooseModelClassDocumentType<User>;

    return `${self.firstName} ${self.lastName}`;
  }

  set fullname(value: string) {
    const self = this as MongooseModelClassDocumentType<User>;
    const [firstName, lastName] = value.split(' ');

    self.firstName = firstName;
    self.lastName = lastName;
  }

  async disable(this: MongooseModelClassDocumentType<User>) {
    const result = await this.updateOne({ status: false });

    return result;
  }
}
