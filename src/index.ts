import Joi from 'joi';
import has from 'lodash/has';
import mongoose, {
  CallbackWithoutResultAndOptionalError,
  DefaultTypeKey,
  IndexDefinition,
  IndexOptions,
  Mongoose,
  PipelineStage,
  Schema,
  SchemaOptions,
} from 'mongoose';

import { DerivedClassDocument, DerivedClassMethods, DerivedClassModel, MongoosePlugin } from './types';
import Util from './util';

function setStaticMethods<TSchema extends Schema, DerivedClass extends MongooseModelClass>(
  target: DerivedClass,
  schema: TSchema,
) {
  const o = target.constructor;
  const properties = Object.getOwnPropertyNames(o);

  properties.forEach((name) => {
    const method = Object.getOwnPropertyDescriptor(o, name);

    if (method && Util.isStaticMethod(name)) schema.static(name, method.value);
  });
}

function setInstanceMethods<TSchema extends Schema>(target: MongooseModelClass, schema: TSchema) {
  const o = target.constructor.prototype;
  const properties = Object.getOwnPropertyNames(o);

  properties.forEach((name) => {
    const method = Object.getOwnPropertyDescriptor(o, name);

    if (method && Util.isInstanceMethod(name, method)) schema.method(name, method.value);
  });
}

function setVirtualMethods<TSchema extends Schema>(target: MongooseModelClass, schema: TSchema) {
  const o = target.constructor.prototype;
  const properties = Object.getOwnPropertyNames(o);

  properties.forEach((name) => {
    const method = Object.getOwnPropertyDescriptor(o, name);

    if (method && Util.isVirtualMethod(name, method)) {
      const v = schema.virtual(name);

      if (has(method, 'set') && method.set) v.set(method.set);
      if (has(method, 'get') && method.get) v.get(method.get);
    }
  });
}

function setLifeCycleCallbacks<TSchema extends Schema>(target: MongooseModelClass, schema: TSchema) {
  schema.pre('save', async function (next) {
    await target.beforeSave(this, next);
  });
  schema.post('save', async function (doc, next) {
    await target.afterSave(doc, next);
  });
  schema.pre('update', async function (next) {
    await target.beforeUpdate(this, next);
  });
  schema.post('update', async function (doc, next) {
    await target.afterUpdate(doc, next);
  });
  schema.pre('find', async function (next) {
    await target.beforeFind(this, next);
  });
  schema.post('find', async function (doc, next) {
    await target.afterFind(doc, next);
  });
  schema.pre('findOne', async function (next) {
    await target.beforeFindOne(this, next);
  });
  schema.post('findOne', async function (doc, next) {
    await target.afterFindOne(doc, next);
  });
  schema.pre('findOneAndDelete', async function (next) {
    await target.beforeFindOneAndDelete(this, next);
  });
  schema.post('findOneAndDelete', async function (doc, next) {
    await target.afterFindOneAndDelete(doc, next);
  });
  schema.pre('findOneAndRemove', async function (next) {
    await target.beforeFindOneAndRemove(this, next);
  });
  schema.post('findOneAndRemove', async function (doc, next) {
    await target.afterFindOneAndRemove(doc, next);
  });
  schema.pre('findOneAndReplace', async function (next) {
    await target.beforeFindOneAndReplace(this, next);
  });
  schema.post('findOneAndReplace', async function (doc, next) {
    await target.afterFindOneAndReplace(doc, next);
  });
  schema.pre('findOneAndUpdate', async function (next) {
    await target.beforeFindOneAndUpdate(this, next);
  });
  schema.post('findOneAndUpdate', async function (doc, next) {
    await target.afterFindOneAndUpdate(doc, next);
  });
  schema.pre('remove', async function (next) {
    await target.beforeRemove(this, next);
  });
  schema.post('remove', async function (doc, next) {
    await target.afterRemove(doc, next);
  });
  schema.pre('aggregate', async function () {
    const stage = await target.beforeAggregate();

    if (stage) this.pipeline().unshift(stage);
  });
  schema.post('aggregate', async function () {
    await target.afterAggregate();
  });

  if (target.beforeAllFinds) {
    schema.pre(/^find/, async function (next) {
      await target.beforeAllFinds(this, next);
    });
  }

  if (target.afterAllFinds) {
    schema.post(/^find/, async function (doc, next) {
      await target.afterAllFinds(doc, next);
    });
  }
}

function buildSchema<DerivedClass extends MongooseModelClass>(target: DerivedClass) {
  const schema = target.schema();

  setStaticMethods<typeof schema, DerivedClass>(target, schema);
  setInstanceMethods(target, schema);
  setVirtualMethods(target, schema);
  setLifeCycleCallbacks(target, schema);

  target.config(schema);

  return schema;
}

function buildModel<DerivedClassConstructor, DerivedClass extends MongooseModelClass>(
  connection: Mongoose,
  plugins: MongoosePlugin[],
  name: string,
  target: DerivedClass,
) {
  const schema = buildSchema<DerivedClass>(target) as unknown as Schema<
    DerivedClassDocument<DerivedClass>,
    DerivedClassModel<DerivedClass, DerivedClassConstructor>,
    DerivedClassMethods<DerivedClass>
  >;

  if (target.getIndexes().length > 0) {
    target.getIndexes().forEach((index) => schema.index(index[0], index[1]));
  }

  if (plugins.length > 0) plugins.forEach((plugin) => schema.plugin(plugin as any));

  return connection.model<DerivedClassDocument<DerivedClass>, DerivedClassModel<DerivedClass, DerivedClassConstructor>>(
    name,
    schema,
    target.options().collection,
  );
}

abstract class MongooseModelClass {
  protected indexUpdatedAtField = false;

  protected indexes: {
    field: IndexDefinition;
    unique: boolean;
  }[] = [];

  protected mongoosePlugins: MongoosePlugin[] = [];

  abstract schema();

  beforeSave(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterSave(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFind(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFind(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOne(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOne(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndDelete(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndDelete(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndRemove(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndRemove(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndReplace(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndReplace(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeAllFinds(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterAllFinds(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeRemove(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterRemove(_: unknown, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeAggregate(): PipelineStage | undefined | void {}

  afterAggregate() {}

  abstract options(): SchemaOptions<DefaultTypeKey>;

  /* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */
  // @ts-ignore
  config(schema: Schema): void {}
  /* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */

  getIndexes() {
    const indices: [IndexDefinition, IndexOptions][] = [];

    if (this.options().timestamps && this.indexUpdatedAtField) {
      indices.push([{ updated_at: 1 }, { unique: false }]);
    }

    const indicesSchema = Joi.array()
      .items(
        Joi.object().keys({
          field: Joi.object().required(),
          unique: Joi.boolean(),
        }),
      )
      .unique();

    const validation = indicesSchema.validate(this.indexes);

    if (validation.error) throw validation.error;

    this.indexes.forEach((index) => {
      indices.push([index.field, { unique: index.unique || false }]);
    });

    return indices;
  }

  build<DerivedClassConstructor>(connection: Mongoose = mongoose, name = this.constructor.name) {
    return buildModel<DerivedClassConstructor, typeof this>(connection, this.mongoosePlugins, name, this);
  }
}

Object.defineProperty(MongooseModelClass, 'adapter', {
  value: mongoose,
  writable: false,
});

Object.defineProperty(MongooseModelClass, 'Schema', {
  value: Schema,
  writable: false,
});

Object.defineProperty(MongooseModelClass, 'types', {
  value: Schema.Types,
  writable: false,
});

Object.defineProperty(MongooseModelClass, 'parseObjectId', {
  value: (id) => {
    const { ObjectId } = mongoose.Types;

    return ObjectId.isValid(id) ? new ObjectId(id) : null;
  },
  writable: false,
});

export * from './types';
export default MongooseModelClass;
