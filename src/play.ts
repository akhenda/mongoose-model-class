import mongoose, { HydratedDocument, InferSchemaType, Model, Schema } from 'mongoose';

import { BeAnObject, MongooseModelClassExtractVirtuals } from './types';
import MongooseModelClassMethods from './methods';

// const test = new Schema({
//   soje: String,
// });

// test.pre("save", function (next) {
//   this.soje = "noa,kjkj";

//   next();
// });

// function buildSchema(defs: unknown) {
//   return new Schema(defs);
// }

abstract class BaseClass<DerivedClassConstructor> extends MongooseModelClassMethods<DerivedClassConstructor> {
  abstract schema(): Schema;

  build<T extends Schema = ReturnType<this['schema']>>() {
    const schema = this.schema() as T;

    this.setStaticMethods(schema);
    this.setInstanceMethods(schema);
    this.setVirtualMethods(schema);
    this.setLifeCycleCallbacks(schema);

    const model = mongoose.model('Hera', schema, 'hera');

    return model as Model<
      InferSchemaType<T>,
      BeAnObject,
      ReturnType<this['setInstanceMethods']>,
      ReturnType<this['setVirtualMethods']>,
      HydratedDocument<
        InferSchemaType<T>,
        ReturnType<this['setVirtualMethods']> & ReturnType<this['setInstanceMethods']>,
        BeAnObject
      >,
      T
    > &
      ReturnType<this['setStaticMethods']>;
  }
}

class Hera extends BaseClass<typeof Hera> {
  /**
   * Get User by Id
   * @param this
   * @param id
   * @returns
   */
  static async getById(this, id: string) {
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

  beforeSave(doc, next) {
    if (doc.password) doc.password = bcrypt.hashSync(doc.password, 10);

    next();
  }

  afterSave(doc, next): void {
    doc.likes += 1;

    next();
  }

  /**
   * Get the full name
   */
  get fullname() {
    const self = this;

    return `${self.firstName} ${self.lastName}`;
  }

  /**
   * Set the full name
   */
  set fullname(value: string) {
    const self = this;
    const [firstName, lastName] = value.split(' ');

    if (firstName) self.firstName = firstName;
    if (lastName) self.lastName = lastName;
  }

  /**
   * Ati nini?
   * @param this
   */
  async signOff(this) {
    await this.updateOne({ isOnline: false });
  }

  /**
   * Disable this model
   * @param this
   * @returns
   */
  async disable(this) {
    const result = await this.updateOne({ enabled: false });

    return result;
  }
}

const hera = new Hera();

const test = hera.build();

const ati = test.getById('123213');

(async () => {
  const tt = await test.findById('dsadad');

  if (tt) {
    tt.password = false;
    tt.disable();
    tt.signOff();
    // tt.fullname
    tt.fullname = 'dfadasd';
  }
})();
// test.pre('save', function (next) {
//   this.sleep = 9
// });
