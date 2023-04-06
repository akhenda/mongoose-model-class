import mongoose, { IndexDefinition, Mongoose, ObtainDocumentType, PipelineStage, Schema } from 'mongoose';
declare abstract class MongooseModelClass {
    protected timestamps: boolean;
    protected indexUpdatedAtField: boolean;
    protected indexes: {
        field: IndexDefinition;
        unique: boolean;
    }[];
    protected mongoosePlugins: unknown[];
    protected builtSchema: Schema<ObtainDocumentType<ReturnType<this['schema']>>>;
    pipeline: () => PipelineStage[];
    beforeSave: (_: any, next: any) => any;
    afterSave: (_: any, next: any) => any;
    beforeUpdate: any;
    afterUpdate: (_: any, next: any) => any;
    beforeFind: any;
    afterFind: (_: any, next: any) => any;
    beforeFindOne: any;
    afterFindOne: (_: any, next: any) => any;
    beforeFindOneAndDelete: any;
    afterFindOneAndDelete: (_: any, next: any) => any;
    beforeFindOneAndRemove: any;
    afterFindOneAndRemove: (_: any, next: any) => any;
    beforeFindOneAndReplace: any;
    afterFindOneAndReplace: (_: any, next: any) => any;
    beforeFindOneAndUpdate: any;
    afterFindOneAndUpdate: (_: any, next: any) => any;
    beforeAllFinds: any;
    afterAllFinds: (_: any, next: any) => any;
    beforeRemove: any;
    afterRemove: (_: any, next: any) => any;
    beforeAggregate: () => PipelineStage | undefined;
    afterAggregate: any;
    options: any;
    constructor();
    abstract schema(): any;
    protected config(): void;
    setStaticMethods(): void;
    setInstanceMethods(): void;
    setVirtualMethods(): void;
    protected setLifeCycleCallbacks(): void;
    getIndexes(): [mongoose.IndexDefinition, mongoose.IndexOptions][];
    buildModel(connection: Mongoose, plugins: any[], name: string): mongoose.Model<mongoose.ObtainDocumentType<any, import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T ? { [K in keyof T]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, "type">, {}, {}, {}, mongoose.Schema<import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T_1 ? { [K in keyof T_1]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, mongoose.Model<import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T_2 ? { [K in keyof T_2]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, any, any, any, any>, {}, {}, {}, {}, "type", mongoose.ObtainDocumentType<any, import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T_3 ? { [K in keyof T_3]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, "type">>>;
    build(connection?: Mongoose, name?: string): mongoose.Model<mongoose.ObtainDocumentType<any, import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T ? { [K in keyof T]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, "type">, {}, {}, {}, mongoose.Schema<import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T_1 ? { [K in keyof T_1]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, mongoose.Model<import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T_2 ? { [K in keyof T_2]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, any, any, any, any>, {}, {}, {}, {}, "type", mongoose.ObtainDocumentType<any, import("mongoose/types/inferschematype").RequiredPaths<ReturnType<this["schema"]>, "type"> & import("mongoose/types/inferschematype").OptionalPaths<ReturnType<this["schema"]>, "type"> extends infer T_3 ? { [K in keyof T_3]: import("mongoose/types/inferschematype").ObtainDocumentPathType<ReturnType<this["schema"]>[K], "type">; } : never, "type">>>;
}
export default MongooseModelClass;
//# sourceMappingURL=index.d.ts.map