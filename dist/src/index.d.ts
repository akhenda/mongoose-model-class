import mongoose, { CallbackWithoutResultAndOptionalError, DefaultTypeKey, IndexDefinition, Mongoose, ObtainDocumentType, PipelineStage, Schema, SchemaDefinition, SchemaDefinitionType, SchemaOptions } from 'mongoose';
import { MongooseModelClassModel } from './types';
declare abstract class MongooseModelClass<DerivedClassConstructor> {
    protected timestamps: boolean;
    protected indexUpdatedAtField: boolean;
    protected indexes: {
        field: IndexDefinition;
        unique: boolean;
    }[];
    protected mongoosePlugins: unknown[];
    builtSchema: Schema<ObtainDocumentType<ReturnType<this['schema']>>>;
    constructor();
    abstract schema(): any;
    config<DocType, IModel, Methods, Virtuals, Statics, TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>>(schema: TSchema): void;
    abstract options<DocType, Methods, Virtuals, Statics>(): SchemaOptions<DefaultTypeKey, DocType, Methods, object, Statics, Virtuals>;
    pipeline(): PipelineStage[];
    beforeSave(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterSave(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeUpdate(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterUpdate(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeFind(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterFind(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOne(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOne(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndDelete(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndDelete(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndRemove(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndRemove(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndReplace(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndReplace(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndUpdate(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndUpdate(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeAllFinds(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterAllFinds(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeRemove(_: any, next: CallbackWithoutResultAndOptionalError): void;
    afterRemove(_: any, next: CallbackWithoutResultAndOptionalError): void;
    beforeAggregate(): PipelineStage | undefined | void;
    afterAggregate(): void;
    setStaticMethods<DocType, IModel, Methods, Virtuals, Statics, TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>>(schema: TSchema): import("./types").MongooseModelClassPickMatching<DerivedClassConstructor, Function>;
    setInstanceMethods<DocType, IModel, Methods, Virtuals, Statics, TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>>(schema: TSchema): import("./types").MongooseModelClassPickMatching<this, Function>;
    setVirtualMethods<DocType, IModel, Methods, Virtuals, Statics, TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>>(schema: TSchema): Virtuals;
    protected setLifeCycleCallbacks<DocType, IModel, Methods, Virtuals, Statics, TSchema extends Schema<DocType, IModel, Methods, object, Virtuals, Statics>>(schema: TSchema): TSchema;
    getIndexes(): [mongoose.IndexDefinition, mongoose.IndexOptions][];
    buildModel<T extends DocType | SchemaDefinition<SchemaDefinitionType<unknown>> | undefined = ReturnType<this['schema']>, DocType extends ObtainDocumentType<unknown> = ObtainDocumentType<T>, Methods = ReturnType<this['setInstanceMethods']>, Statics = ReturnType<this['setStaticMethods']>, Virtuals = ReturnType<this['setVirtualMethods']>, TModel = MongooseModelClassModel<DocType, Methods, Virtuals, Statics>>(connection: Mongoose, plugins: any[], name: string): TModel & import("./types").MongooseModelClassModelType<this, object, Virtuals, Statics> & this;
    build(connection?: Mongoose, name?: string): mongoose.Model<import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T ? { [K in keyof T]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, object, ReturnType<this["setInstanceMethods"]>, ReturnType<this["setVirtualMethods"]>, any> & ReturnType<this["setStaticMethods"]> & import("./types").MongooseModelClassModelType<this, object, ReturnType<this["setVirtualMethods"]>, ReturnType<this["setStaticMethods"]>> & this;
}
export * from './types';
export default MongooseModelClass;
//# sourceMappingURL=index.d.ts.map