import {
  Document,
  HydratedDocument,
  InferSchemaType,
  Model,
  ObtainDocumentType,
  ObtainSchemaGeneric,
  Schema,
} from 'mongoose';

export type MongooseModelClassPickMatching<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] };
export type MongooseModelClassExtractMethods<T> = MongooseModelClassPickMatching<T, Function>;
export type MongooseModelClassModel<DocType, Methods, Virtuals, Statics> = Model<DocType, object, Methods, Virtuals> &
  Statics;

/**
 * This type is for lint error "ban-types" where "{}" would be used
 * This type is separate from "{@link KeyStringAny}" because it has a different meaning
 */
export type BeAnObject = Record<string, any>;

/**
 * Any-param Constructor
 */
export type AnyParamConstructor<T> = new (...args: any) => T & {
  options: Record<string, unknown>;
};

/**
 * Get the Type of an instance of a Document with Class properties
 * @example
 * ```ts
 * class ClassName {}
 * const NameModel = new ClassName().build();
 *
 * const doc: MongooseModelClassDocumentType<ClassName> = await NameModel.create({});
 * ```
 */
export type MongooseModelClassDocumentType<T extends { builtSchema: any }, QueryHelpers = BeAnObject> = Document<
  any,
  QueryHelpers
> &
  InferSchemaType<T['builtSchema']>;

/**
 * Used Internally for ModelTypes
 */
export type MongooseModelClassModelType<
  T extends { builtSchema: any },
  QueryHelpers = BeAnObject,
  Statics = BeAnObject,
  Virtuals = BeAnObject,
> = Model<MongooseModelClassDocumentType<T, QueryHelpers>, QueryHelpers, object, Virtuals, Statics>;

/**
 * The Type for Models used in typegoose, mostly returned by "getModelForClass" and "addModelToTypegoose"
 * @example
 * const Model: MongooseModelClassReturnModelType<YourClass, YourClassQueryHelper> = mongoose.model("YourClass", YourClassSchema);
 */
export type MongooseModelClassReturnModelType<
  ModelClass extends { builtSchema: any },
  QueryHelpers = BeAnObject,
  Virtuals = BeAnObject,
  Statics = BeAnObject,
> = MongooseModelClassModelType<ModelClass, QueryHelpers, Virtuals, Statics> & ModelClass;

export type DerivedConstructorFromInstanceType<T> = abstract new () => T;

export type HydratedDocumentFromSchema<TSchema extends Schema> = HydratedDocument<
  InferSchemaType<TSchema>,
  ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
  ObtainSchemaGeneric<TSchema, 'TVirtuals'>
>;

export type HydratedDocumentInHook<DocType, Methods = BeAnObject> = HydratedDocument<
  ObtainDocumentType<any, DocType, 'type'>,
  Methods,
  object
>;
