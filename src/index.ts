import Joi from 'joi';
import has from 'lodash/has';
import mongoose, {
  CallbackWithoutResultAndOptionalError,
  DefaultTypeKey,
  IndexDefinition,
  IndexOptions,
  Mongoose,
  ObtainDocumentType,
  PipelineStage,
  Schema,
  SchemaDefinition,
  SchemaDefinitionType,
  SchemaOptions,
} from 'mongoose';

import { MongooseModelClassExtractMethods, MongooseModelClassModel, MongooseModelClassReturnModelType } from './types';
import Util from './util';

abstract class MongooseModelClass<DerivedClassConstructor> {
  protected timestamps = true;

  protected indexUpdatedAtField = false;

  protected indexes: {
    field: IndexDefinition;
    unique: boolean;
  }[] = [];

  protected mongoosePlugins: unknown[] = [];

  public builtSchema: Schema<ObtainDocumentType<ReturnType<this['schema']>>>;

  constructor() {
    this.builtSchema = new Schema<ObtainDocumentType<ReturnType<this['schema']>>>(this.schema());
  }

  abstract schema();

  config<
    DocType,
    IModel,
    Methods,
    Virtuals,
    Statics,
    TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>,
    /* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */
    // @ts-ignore
  >(schema: TSchema): void {}
  /* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */

  abstract options<DocType, Methods, Virtuals, Statics>(): SchemaOptions<
    DefaultTypeKey,
    DocType,
    Methods,
    object,
    Statics,
    Virtuals
  >;

  pipeline(): PipelineStage[] {
    return [];
  }

  beforeSave(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterSave(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeUpdate(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterUpdate(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFind(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFind(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOne(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOne(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndDelete(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndDelete(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndRemove(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndRemove(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndReplace(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndReplace(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeFindOneAndUpdate(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterFindOneAndUpdate(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeAllFinds(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterAllFinds(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeRemove(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  afterRemove(_: any, next: CallbackWithoutResultAndOptionalError) {
    next();
  }

  beforeAggregate(): PipelineStage | undefined | void {}

  afterAggregate() {}

  setStaticMethods<
    DocType,
    IModel,
    Methods,
    Virtuals,
    Statics,
    TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>,
  >(schema: TSchema) {
    const o = this.constructor;
    const properties = Object.getOwnPropertyNames(o);

    properties.forEach((name) => {
      const method = Object.getOwnPropertyDescriptor(o, name);

      if (method && Util.isStaticMethod(name)) schema.static(name, method.value);
    });

    return Object.entries(schema.statics).reduce((result, [name, method]) => {
      return { ...result, [name]: method };
    }, {} as MongooseModelClassExtractMethods<DerivedClassConstructor>);
  }

  setInstanceMethods<
    DocType,
    IModel,
    Methods,
    Virtuals,
    Statics,
    TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>,
  >(schema: TSchema) {
    const o = this.constructor.prototype;
    const properties = Object.getOwnPropertyNames(o);

    properties.forEach((name) => {
      const method = Object.getOwnPropertyDescriptor(o, name);

      if (method && Util.isInstanceMethod(name, method)) schema.method(name, method.value);
    });

    return Object.entries(schema.methods).reduce((result, [name, method]) => {
      return { ...result, [name]: method };
    }, {} as MongooseModelClassExtractMethods<this>);
  }

  setVirtualMethods<
    DocType,
    IModel,
    Methods,
    Virtuals,
    Statics,
    TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>,
  >(schema: TSchema) {
    const o = this.constructor.prototype;
    const properties = Object.getOwnPropertyNames(o);

    properties.forEach((name) => {
      const method = Object.getOwnPropertyDescriptor(o, name);

      if (method && Util.isVirtualMethod(name, method)) {
        const v = schema.virtual(name);

        // @ts-ignore
        if (has(method, 'set')) v.set(method.set);
        // @ts-ignore
        if (has(method, 'get')) v.get(method.get);
      }
    });

    return schema.virtuals;
  }

  protected setLifeCycleCallbacks<
    DocType,
    IModel,
    Methods,
    Virtuals,
    Statics,
    TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>,
  >(schema: TSchema) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    schema.pre('save', async function (next) {
      await self.beforeSave(this, next);
    });
    schema.post('save', async function (doc, next) {
      await self.afterSave(doc, next);
    });

    schema.pre('update', async function (next) {
      await self.beforeUpdate(this, next);
    });
    schema.post('update', async function (doc, next) {
      await self.afterUpdate(doc, next);
    });

    schema.pre('find', async function (next) {
      await self.beforeFind(this, next);
    });
    schema.post('find', async function (doc, next) {
      await self.afterFind(doc, next);
    });

    schema.pre('findOne', async function (next) {
      await self.beforeFindOne(this, next);
    });
    schema.post('findOne', async function (doc, next) {
      await self.afterFindOne(doc, next);
    });

    schema.pre('findOneAndDelete', async function (next) {
      await self.beforeFindOneAndDelete(this, next);
    });
    schema.post('findOneAndDelete', async function (doc, next) {
      await self.afterFindOneAndDelete(doc, next);
    });

    schema.pre('findOneAndRemove', async function (next) {
      await self.beforeFindOneAndRemove(this, next);
    });
    schema.post('findOneAndRemove', async function (doc, next) {
      await self.afterFindOneAndRemove(doc, next);
    });

    schema.pre('findOneAndReplace', async function (next) {
      await self.beforeFindOneAndReplace(this, next);
    });
    schema.post('findOneAndReplace', async function (doc, next) {
      await self.afterFindOneAndReplace(doc, next);
    });

    schema.pre('findOneAndUpdate', async function (next) {
      await self.beforeFindOneAndUpdate(this, next);
    });
    schema.post('findOneAndUpdate', async function (doc, next) {
      await self.afterFindOneAndUpdate(doc, next);
    });

    schema.pre('remove', async function (next) {
      await self.beforeRemove(this, next);
    });
    schema.post('remove', async function (doc, next) {
      await self.afterRemove(doc, next);
    });

    schema.pre('aggregate', async function () {
      const stage = await self.beforeAggregate();

      if (stage) this.pipeline().unshift(stage);
    });
    schema.post('aggregate', async function () {
      await self.afterAggregate();
    });

    if (self.beforeAllFinds) {
      schema.pre(/^find/, async function (next) {
        await self.beforeAllFinds(this, next);
      });
    }

    if (self.afterAllFinds) {
      schema.post(/^find/, async function (doc, next) {
        await self.afterAllFinds(doc, next);
      });
    }

    return schema;
  }

  getIndexes() {
    const indices: [IndexDefinition, IndexOptions][] = [];

    if (this.timestamps && this.indexUpdatedAtField) {
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

  buildModel<
    T extends DocType | SchemaDefinition<SchemaDefinitionType<unknown>> | undefined = ReturnType<this['schema']>,
    DocType extends ObtainDocumentType<unknown> = ObtainDocumentType<T>,
    Methods = ReturnType<this['setInstanceMethods']>,
    Statics = ReturnType<this['setStaticMethods']>,
    Virtuals = ReturnType<this['setVirtualMethods']>,
    TModel = MongooseModelClassModel<DocType, Methods, Virtuals, Statics>,
  >(connection: Mongoose, plugins: any[], name: string) {
    const definition = this.schema() as T;
    const schema = new Schema<DocType, TModel, Methods, object, Virtuals, Statics>(definition, this.options());

    this.setStaticMethods<DocType, TModel, Methods, Virtuals, Statics, typeof schema>(schema);
    this.setInstanceMethods<DocType, TModel, Methods, Virtuals, Statics, typeof schema>(schema);
    this.setVirtualMethods<DocType, TModel, Methods, Virtuals, Statics, typeof schema>(schema);
    this.setLifeCycleCallbacks<DocType, TModel, Methods, Virtuals, Statics, typeof schema>(schema);
    this.config<DocType, TModel, Methods, Virtuals, Statics, typeof schema>(schema);

    if (this.getIndexes().length > 0) this.getIndexes().forEach((index) => schema.index(index[0], index[1]));

    if (plugins.length > 0) plugins.forEach((plugin) => schema.plugin(plugin));

    const model = connection.model<DocType, TModel>(name, schema, this.options().collection);

    this.builtSchema = schema as unknown as Schema<ObtainDocumentType<ReturnType<this['schema']>>>;

    return model as typeof model & MongooseModelClassReturnModelType<typeof this, object, Virtuals, Statics>;
  }

  build(connection: Mongoose = mongoose, name: string = this.constructor.name) {
    return this.buildModel(connection, this.mongoosePlugins, name);
  }
}

Object.defineProperty(MongooseModelClass, 'adapter', {
  value: mongoose,
  writable: false,
});

Object.defineProperty(MongooseModelClass, 'Schema', {
  value: mongoose.Schema,
  writable: false,
});

Object.defineProperty(MongooseModelClass, 'types', {
  value: mongoose.Schema.Types,
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
