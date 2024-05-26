import mongoose, { HydratedDocument, InferSchemaType, Model, Mongoose } from 'mongoose';

export type MongoosePlugin = Mongoose['plugin'];
export type DerivedConstructorFromInstanceType<T> = abstract new () => T;

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

type Getters<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? never
    : T extends { [key in K]: infer U }
      ? U extends (...args: any[]) => any
        ? never
        : K
      : never;
}[keyof T];
type Setters<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? never
    : T extends { [key in K]: infer U }
      ? U extends (value: any) => void
        ? K
        : never
      : never;
}[keyof T];
type GettersAndSetters<T> = Getters<T> | Setters<T>;
type OnlyGettersAndSetters<T> = Pick<T, GettersAndSetters<T>>;
export type MongooseModelClassExtractVirtuals<T> = OnlyGettersAndSetters<T>;
export type MongooseModelClassPickMatching<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] };
export type MongooseModelClassExtractMethods<T> = MongooseModelClassPickMatching<T, Function>;
export type MongooseModelClassExtractStatics<T extends AnyParamConstructor<any>> = MongooseModelClassExtractMethods<T>;

/**
 * Reference another Model
 */
export type Ref<
  PopulatedType,
  RawId extends mongoose.RefType =
    | (PopulatedType extends {
        _id?: mongoose.RefType;
      }
        ? NonNullable<PopulatedType['_id']>
        : mongoose.Types.ObjectId)
    | undefined,
> = mongoose.PopulatedDoc<PopulatedType, RawId>;

export type MongooseModelClassModel<
  Schema,
  Methods,
  Virtuals,
  Statics,
  QueryHelpers = BeAnObject,
  DocType = InferSchemaType<Schema>,
  HDoc = HydratedDocument<DocType, Virtuals & Methods, QueryHelpers>,
> = Model<DocType, QueryHelpers, Methods, Virtuals, HDoc, Schema> & Statics;

export type MongooseModelClassDocumentType<
  ModelClass extends { schema: any },
  TSchema = ReturnType<ModelClass['schema']>,
  DocType = InferSchemaType<TSchema>,
  QueryHelpers = BeAnObject,
  Methods = MongooseModelClassExtractMethods<ModelClass>,
  Virtuals = MongooseModelClassExtractVirtuals<ModelClass>,
> = HydratedDocument<DocType, Virtuals & Methods, QueryHelpers> & DocType;

// export type ModelType<
//   T extends AnyParamConstructor<any>,
//   TSchema = ReturnType<InstanceType<T>['schema']>,
//   DocType = InferSchemaType<TSchema>,
//   QueryHelpers = BeAnObject,
//   Statics = MongooseModelClassExtractStatics<T>,
//   Virtuals = MongooseModelClassExtractVirtuals<InstanceType<T>>,
//   Methods = MongooseModelClassExtractMethods<InstanceType<T>>,
// > = Model<
//   DocType,
//   QueryHelpers,
//   Methods,
//   Virtuals,
//   HydratedDocument<DocType, Virtuals & Methods, QueryHelpers>,
//   TSchema
// > &
//   Statics;

export type MongooseModelClassModelType<
  ModelClass extends { schema: any },
  QueryHelpers = BeAnObject,
  Statics = BeAnObject,
  Virtuals = MongooseModelClassExtractVirtuals<ModelClass>,
  Methods = MongooseModelClassExtractMethods<ModelClass>,
  TSchema = ReturnType<ModelClass['schema']>,
  DocType = InferSchemaType<TSchema>,
  HDoc = HydratedDocument<DocType, Virtuals & Methods, QueryHelpers>,
> = Model<DocType, QueryHelpers, Methods, Virtuals, HDoc, TSchema> & Statics;

export type MongooseModelClassReturnModelType<
  T extends AnyParamConstructor<any>,
  QueryHelpers = BeAnObject,
  Statics = MongooseModelClassExtractStatics<T>,
  Virtuals = MongooseModelClassExtractVirtuals<InstanceType<T>>,
  Methods = MongooseModelClassExtractMethods<InstanceType<T>>,
> = MongooseModelClassModelType<InstanceType<T>, QueryHelpers, Statics, Virtuals, Methods>;
