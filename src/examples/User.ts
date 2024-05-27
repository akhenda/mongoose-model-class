import bcrypt from 'bcrypt';
import mongoose, { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';

import { MongooseModelClassDocumentType, MongooseModelClassReturnModelType } from '../types';

import BaseModel from './Base';

export class User extends BaseModel<typeof User> {
  collectionName = 'users-ex';

  /**
   * Get a user by their ID
   */
  static async getById(this: MongooseModelClassReturnModelType<typeof User>, id: string | mongoose.Types.ObjectId) {
    /**
     * Get a user by their ID
     */
    const user = await this.findById(id);

    if (!user) throw new Error('User not found.');

    return user;
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
        enum: ['ready', 'processing', 'done', 'failed', 'canceled', 'disabled'],
        required: true,
        type: String,
      },
      username: { required: true, type: String },
    });
  }

  beforeSave(this: MongooseModelClassDocumentType<this>, next: CallbackWithoutResultAndOptionalError) {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);

    next();
  }

  afterSave(doc: MongooseModelClassDocumentType<this>, next: CallbackWithoutResultAndOptionalError): void {
    doc.likes += 1;

    next();
  }

  get fullname() {
    const that = this as MongooseModelClassDocumentType<this>;

    return `${that.firstName} ${that.lastName}`;
  }

  set fullname(value: string) {
    const that = this as MongooseModelClassDocumentType<this>;
    const [firstName, lastName] = value.split(' ');

    if (firstName) that.firstName = firstName;
    if (lastName) that.lastName = lastName;
  }

  /**
   * This signs off/out a user
   */
  async signOff(this: MongooseModelClassDocumentType<this>) {
    await this.updateOne({ isOnline: false });
  }

  /**
   * This disables a user account
   */
  async disable(this: MongooseModelClassDocumentType<this>) {
    const result = await this.updateOne({ enabled: false, status: 'disabled' });

    return result;
  }
}
