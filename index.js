const Joi = require('joi');
const map = require('lodash/map');
const has = require('lodash/has');
const mongoose = require('mongoose');
const Util = require('./util');

class MongooseModelClass {
  constructor() {
    this.indexes = [];
    this.timestamps = true;
    this.mongoosePlugins = [];
    this.indexUpdatedAtField = false; // helpful for big query (disable by default)
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

  beforeUpdate(doc, next) {
    next();
  }

  afterUpdate(doc, next) {
    next();
  }

  beforeFind(doc, next) {
    next();
  }

  afterFind(doc, next) {
    next();
  }

  beforeFindOne(doc, next) {
    next();
  }

  afterFindOne(doc, next) {
    next();
  }

  beforeFindOneAndDelete(doc, next) {
    next();
  }

  afterFindOneAndDelete(doc, next) {
    next();
  }

  beforeFindOneAndRemove(doc, next) {
    next();
  }

  afterFindOneAndRemove(doc, next) {
    next();
  }

  beforeFindOneAndReplace(doc, next) {
    next();
  }

  afterFindOneAndReplace(doc, next) {
    next();
  }

  beforeFindOneAndUpdate(doc, next) {
    next();
  }

  afterFindOneAndUpdate(doc, next) {
    next();
  }

  beforeAllFinds(doc, next) {
    next();
  }

  afterAllFinds(doc, next) {
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

  getIndexes() {
    const indices = [];

    if (this.timestamps && this.indexUpdatedAtField) {
      indices.push([{ updated_at: 1 }, { unique: false }]);
    }

    const indicesSchema = Joi.array().items(
      Joi.object().keys({
        field: Joi.object().required(),
        unique: Joi.boolean(),
      }),
    ).unique();

    const validation = indicesSchema.validate(this.indexes);

    if (validation.error) {
      console.log(validation);
      throw validation.error;
    }

    this.indexes.forEach((index) => {
      indices.push([index.field, { unique: index.unique || false }]);
    });

    return indices;
  }
}

function buildModel(connection, plugins, name, target) {
  const schema = buildSchema(target);

  if (target.getIndexes().length > 0) {
    target.getIndexes().forEach(index => schema.index(index[0], index[1]));
  }
  if (plugins.length > 0) plugins.forEach(plugin => schema.plugin(plugin));

  return connection.model(name, schema, target.options().collection);
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
  map(properties, name => {
    const method = Object.getOwnPropertyDescriptor(o, name);
    if (Util.isStaticMethod(name, method)) {
      schema.statics[name] = method.value;
    }
  })
}

function setInstanceMethods(target, schema) {
  const o = target.constructor.prototype;
  const properties = Object.getOwnPropertyNames(o)
  map(properties, name => {
    const method = Object.getOwnPropertyDescriptor(o, name)
    if (Util.isInstanceMethod(name, method)) {
      schema.method(name, method.value);
    }
  })
}

function setVirtualMethods(target, schema) {
  const o = target.constructor.prototype;
  const properties = Object.getOwnPropertyNames(o);
  map(properties, name => {
    const method = Object.getOwnPropertyDescriptor(o, name);
    if (Util.isVirtualMethod(name, method)) {
      const v = schema.virtual(name);
      if (has(method, 'set')) {
        v.set(method.set);
      }
      if (has(method, 'get')) {
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
  schema.pre('update', async function(next) {
    await target.beforeUpdate(this, next);
  })
  schema.post('update', async function(doc, next) {
    await target.afterUpdate(doc, next);
  })
  schema.pre('find', async function(next) {
    await target.beforeFind(this, next);
  })
  schema.post('find', async function(doc, next) {
    await target.afterFind(doc, next);
  })
  schema.pre('findOne', async function(next) {
    await target.beforeFindOne(this, next);
  })
  schema.post('findOne', async function(doc, next) {
    await target.afterFindOne(doc, next);
  })
  schema.pre('findOneAndDelete', async function(next) {
    await target.beforeFindOneAndDelete(this, next);
  })
  schema.post('findOneAndDelete', async function(doc, next) {
    await target.afterFindOneAndDelete(doc, next);
  })
  schema.pre('findOneAndRemove', async function(next) {
    await target.beforeFindOneAndRemove(this, next);
  })
  schema.post('findOneAndRemove', async function(doc, next) {
    await target.afterFindOneAndRemove(doc, next);
  })
  schema.pre('findOneAndReplace', async function(next) {
    await target.beforeFindOneAndReplace(this, next);
  })
  schema.post('findOneAndReplace', async function(doc, next) {
    await target.afterFindOneAndReplace(doc, next);
  })
  schema.pre('findOneAndUpdate', async function(next) {
    await target.beforeFindOneAndUpdate(this, next);
  })
  schema.post('findOneAndUpdate', async function(doc, next) {
    await target.afterFindOneAndUpdate(doc, next);
  })
  schema.pre('remove', async function(next) {
    await target.beforeRemove(this, next);
  })
  schema.post('remove', async function(doc, next) {
    await target.afterRemove(doc, next);
  })

  if (target.beforeAllFinds) {
    schema.pre(/^find/, async function(next) {
      await target.beforeAllFinds(this, next);
    })
  }

  if (target.afterAllFinds) {
    schema.post(/^find/, async function(doc, next) {
      await target.afterAllFinds(doc, next);
    })
  }
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
