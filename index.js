const _ = require('lodash');
const mongoose = require('mongoose');
const Util = require('./util');

class MongooseModelClass {
  constructor() {
    this.timestamps = true;
    this.mongoosePlugins = [];
  }

  schema() {
    throw new Error('The method schema must be implemented');
  }

  beforeSave(doc, next) {
    next();
  }

  afterSave(doc, next) {
    next();
  }

  beforeRemove(doc, next) {
    next();
  }

  afterRemove(doc, next) {
    next();
  }

  options() {
    return {};
  }

  config(schema) {}

  build(connection, name) {
    return buildModel(connection, this.mongoosePlugins, name, this);
  }
}

function buildModel(connection, plugins, name, target) {
  const schema = buildSchema(target);

  if (plugins.length > 0) plugins.forEach(plugin => schema.plugin(plugin));

  return connection.model(name, schema);
}

function buildSchema(target) {
  const schema = new mongoose.Schema(target.schema(), target.options());
  setStaticMethods(target, schema);
  setInstanceMethods(target, schema);
  setVirtualMethods(target, schema);
  setLifeCycleCallbacks(target, schema);
  target.config(schema);
  return schema;
}

function setStaticMethods(target, schema) {
  const o = target.constructor;
  const properties = Object.getOwnPropertyNames(o)
  _.map(properties, name => {
    const method = Object.getOwnPropertyDescriptor(o, name);
    if (Util.isStaticMethod(name, method)) {
      schema.statics[name] = method.value;
    }
  })
}

function setInstanceMethods(target, schema) {
  const o = target.constructor.prototype;
  const properties = Object.getOwnPropertyNames(o)
  _.map(properties, name => {
    const method = Object.getOwnPropertyDescriptor(o, name)
    if (Util.isInstanceMethod(name, method)) {
      schema.method(name, method.value);
    }
  })
}

function setVirtualMethods(target, schema) {
  const o = target.constructor.prototype;
  const properties = Object.getOwnPropertyNames(o);
  _.map(properties, name => {
    const method = Object.getOwnPropertyDescriptor(o, name);
    if (Util.isVirtualMethod(name, method)) {
      const v = schema.virtual(name);
      if (_.has(method, 'set')) {
        v.set(method.set);
      }
      if (_.has(method, 'get')) {
        v.get(method.get);
      }
    }
  })
}

function setLifeCycleCallbacks(target, schema) {
  schema.pre('save', async function(next) {
    await target.beforeSave(this, next);
  })
  schema.post('save', async function(doc, next) {
    await target.afterSave(doc, next);
  })
  schema.pre('remove', async function(next) {
    await target.beforeRemove(this, next);
  })
  schema.post('remove', async function(doc, next) {
    await target.afterRemove(doc, next);
  })
}

Object.defineProperty(MongooseModelClass, 'adapter', {
  value: mongoose,
  writable: false
})

Object.defineProperty(MongooseModelClass, 'Schema', {
  value: mongoose.Schema,
  writable: false
})

Object.defineProperty(MongooseModelClass, 'types', {
  value: mongoose.Schema.Types,
  writable: false
})

Object.defineProperty(MongooseModelClass, 'parseObjectId', {
  value: id => {
    const ObjectId = mongoose.Types.ObjectId
    return ObjectId.isValid(id) ? new ObjectId(id) : null
  },
  writable: false
})

module.exports = MongooseModelClass;
