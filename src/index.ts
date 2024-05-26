import Joi from 'joi';
import mongoose, {
  IndexDefinition,
  IndexOptions,
  InferSchemaType,
  Mongoose,
  MongooseModelClassModel,
  Schema,
  SchemaOptions,
} from 'mongoose';

import MongooseModelClassMethods from './methods';
import { BeAnObject, MongooseModelClassExtractMethods, MongooseModelClassExtractVirtuals } from './types';

abstract class MongooseModelClass<DerivedClassConstructor> extends MongooseModelClassMethods {
  protected timestamps = true;
  protected indexUpdatedAtField = false;
  protected indexes: { field: IndexDefinition; unique: boolean }[] = [];
  protected mongoosePlugins: any[] = [];

  abstract schema(): Schema;

  options(): SchemaOptions {
    return {};
  }

  getIndexes() {
    const indices: [IndexDefinition, IndexOptions][] = [];

    if (this.timestamps && this.indexUpdatedAtField) {
      indices.push([{ updated_at: 1 }, { unique: false }]);
    }

    const indicesSchema = Joi.array()
      .items(Joi.object().keys({ field: Joi.object().required(), unique: Joi.boolean() }))
      .unique();

    const validation = indicesSchema.validate(this.indexes);

    if (validation.error) throw validation.error;

    this.indexes.forEach((index) => {
      indices.push([index.field, { unique: index.unique || false }]);
    });

    return indices;
  }

  buildModel<
    T extends Schema = ReturnType<this['schema']>,
    DocType = InferSchemaType<T>,
    QueryHelpers = BeAnObject,
    Methods = MongooseModelClassExtractMethods<this>,
    Statics = MongooseModelClassExtractMethods<DerivedClassConstructor>,
    Virtuals = MongooseModelClassExtractVirtuals<this>,
    TModel = MongooseModelClassModel<T, Methods, Virtuals, QueryHelpers> & Statics,
  >(name: string = this.constructor.name, connection: Mongoose = mongoose) {
    const schema = this.schema();

    this.setStaticMethods(schema);
    this.setInstanceMethods(schema);
    this.setVirtualMethods(schema);
    this.setLifeCycleCallbacks(schema);

    if (this.getIndexes().length > 0) this.getIndexes().forEach(([def, opts]) => schema.index(def, opts));
    if (this.mongoosePlugins.length > 0) this.mongoosePlugins.forEach((plugin) => schema.plugin(plugin));

    const model = connection.model<DocType, TModel>(name, schema, this.options().collection);

    return model;
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
  value: (id: mongoose.Types.ObjectId) => {
    const { ObjectId } = mongoose.Types;

    return ObjectId.isValid(id) ? new ObjectId(id) : null;
  },
  writable: false,
});

export * from './types';
export default MongooseModelClass;
