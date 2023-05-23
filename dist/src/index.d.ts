import mongoose, { CallbackWithoutResultAndOptionalError, DefaultTypeKey, IndexDefinition, Mongoose, PipelineStage, Schema, SchemaOptions } from 'mongoose';
import { DerivedClassModel, MongoosePlugin } from './types';
declare abstract class MongooseModelClass<DerivedClassConstructor> {
    protected indexUpdatedAtField: boolean;
    protected indexes: {
        field: IndexDefinition;
        unique: boolean;
    }[];
    protected mongoosePlugins: MongoosePlugin[];
    abstract schema(): any;
    beforeSave(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterSave(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeFind(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterFind(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOne(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOne(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndDelete(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndDelete(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndRemove(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndRemove(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndReplace(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndReplace(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeFindOneAndUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterFindOneAndUpdate(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeAllFinds(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterAllFinds(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeRemove(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    afterRemove(_: unknown, next: CallbackWithoutResultAndOptionalError): void;
    beforeAggregate(): PipelineStage | undefined | void;
    afterAggregate(): void;
    abstract options(): SchemaOptions<DefaultTypeKey>;
    config(schema: Schema): void;
    getIndexes(): [mongoose.IndexDefinition, mongoose.IndexOptions][];
    build(connection?: Mongoose, name?: string): DerivedClassModel<this, DerivedClassConstructor>;
}
export * from './types';
export default MongooseModelClass;
//# sourceMappingURL=index.d.ts.map