const mongoose = require('mongoose');
const sha1 = require('sha1');
const MongooseModelClass = require('../index');

describe('Mongoose Model Class tests', () => {

  let classUser, modelUser, docUser;

  it('Should build model', () => {
    const uri = 'mongodb://localhost/mongoose-model-class';
    mongoose.connect(uri, {});
    modelUser = classUser.build(mongoose, 'User');
  });

  it('Should create document', async () => {
    docUser = await modelUser.create({
      firstName: 'Ernesto',
      lastName: 'Rojas',
      email: 'ernesto20145@gmail.com',
      phone: '+56 945472812',
      username: 'ernestojr',
      password: '20145',
    });
    if (!(docUser.password === sha1('20145'))) {
      throw new Error('Password is not convert to sha1');
    }
  });

  it('Should call static method', async () => {
    await modelUser.getById(docUser.id);
  });

  it('Should call instance method', async () => {
    await docUser.disable();
  });

  it('Should call virtual method', async () => {
    if (docUser.fullname !== 'Ernesto Rojas') {
      throw new Error('virtual method is fail.');
    }
  });

  before(() => {
    class User extends MongooseModelClass {
      schema() {
        return {
          firstName: { type: String, require: true },
          lastName: { type: String, require: true },
          email: { type: String, require: true },
          phone: { type: String, require: true },
          username: { type: String, require: true },
          password: { type: String, require: true },
          status: { type: Boolean, default: true },
        };
      }

      beforeSave(doc, next) {
        doc.password = sha1(doc.password);
        next();
      }

      get fullname() {
        return `${this.firstName} ${this.lastName}`;
      }

      set fullname(value) {
        const fName = value.split(' ');
        this.firstName = fName[0];
        this.lastName = fName[1];
      }

      static async getById(id) {
        const user = await this.findById(id);
        if (!user) {
          throw new Error('User not found.');
        }
        return user;
      }

      disable() {
        return this.model('User').updateOne({ _id: this.id }, { $set: { status: false } });
      }

    }

    classUser = new User();

  })

  after(async () => {
    await modelUser.deleteOne({});
  })

});
