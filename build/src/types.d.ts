import { Document, HydratedDocument, InferSchemaType, Model, Mongoose, ObtainDocumentType, ObtainSchemaGeneric, Schema } from 'mongoose';
export type MongoosePlugin = Mongoose['plugin'];
export type PickMatching<T, V> = {
    [K in keyof T as T[K] extends V ? K : never]: T[K];
};
export type ExtractMethods<T> = PickMatching<T, Function>;
/**
 * This type is for lint error "ban-types" where "{}" would be used
 * This type is separate from "{@link KeyStringAny}" because it has a different meaning
 */
export type BeAnObject = Record<string, any>;
/**
 * Get the Type of an instance of a Document with Class properties
 * @example
 * ```ts
 * class ClassName {}
 * const NameModel = new ClassName().build();
 *
 * const doc: DocumentType<ClassName> = await NameModel.create({});
 * ```
 */
export type DocumentType<T extends {
    schema: any;
}, QueryHelpers = BeAnObject> = Document<any, QueryHelpers> & InferSchemaType<ReturnType<T['schema']>>;
/**
 * Used Internally for ModelTypes
 */
export type ModelType<T extends {
    schema: any;
}, QueryHelpers = BeAnObject, Statics = BeAnObject, Virtuals = BeAnObject> = Model<DocumentType<T, QueryHelpers>, QueryHelpers, object, Virtuals, Statics>;
/**
 * The Type for Models used in typegoose, mostly returned by "getModelForClass" and "addModelToTypegoose"
 * @example
 * const Model: ReturnModelType<YourClass, YourClassQueryHelper> = mongoose.model("YourClass", YourClassSchema);
 */
export type ReturnModelType<T extends {
    schema: any;
}, QueryHelpers = BeAnObject, Virtuals = BeAnObject, Statics = BeAnObject> = ModelType<T, QueryHelpers, Virtuals, Statics> & T;
export type HydratedDocumentFromSchema<TSchema extends Schema> = HydratedDocument<InferSchemaType<TSchema>, ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>, ObtainSchemaGeneric<TSchema, 'TVirtuals'>>;
export type HydratedDocumentInHook<DocType, Methods = BeAnObject> = HydratedDocument<ObtainDocumentType<any, DocType, 'type'>, Methods, object>;
export type Timestamps = {
    created_at?: Date;
    updated_at?: Date;
    createdAt?: Date;
    updatedAt?: Date;
};
export type DerivedClassDocument<DerivedClass extends {
    schema: any;
}> = InferSchemaType<ReturnType<DerivedClass['schema']>> & Timestamps;
export type DerivedClassMethods<DerivedClass> = ExtractMethods<DerivedClass>;
export type DerivedClassStatics<DerivedClassConstructor> = ExtractMethods<DerivedClassConstructor>;
export type DerivedClassModel<DerivedClass extends {
    schema: any;
}, DerivedClassConstructor> = Model<DerivedClassDocument<DerivedClass>, object, DerivedClassMethods<DerivedClass>> & DerivedClassStatics<DerivedClassConstructor>;
//# sourceMappingURL=types.d.ts.map