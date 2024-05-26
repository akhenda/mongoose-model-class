/// <reference path="../types/mongoose.d.ts" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/aggregate" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/callback" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/collection" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/connection" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/cursor" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/document" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/error" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/expressions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/helpers" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/middlewares" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/indexes" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/models" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/pipelinestage" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/populate" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/query" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/schemaoptions" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/schematypes" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/session" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/types" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/utility" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/validation" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/virtuals" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types="mongoose-unique-validator/node_modules/mongoose/types/inferschematype" />
/// <reference types="recachegoose" />
import mongoose, { Mongoose } from 'mongoose';
import MongooseModelClass from '../index';
import { MongoosePlugin } from '../types';
declare abstract class BaseModel<U> extends MongooseModelClass<U> {
    abstract collectionName: string;
    timestamps: boolean;
    indexUpdatedAtField: boolean;
    mongoosePlugins: MongoosePlugin[];
    constructor();
    options(): mongoose.SchemaOptions<unknown, {}, {}, {}, {}, mongoose.Document<unknown, {}, unknown> & {
        _id: mongoose.Types.ObjectId;
    }>;
    schema(): mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{}>> & mongoose.FlatRecord<{}> & Required<{
        _id: unknown;
    }>>;
    build(modelName?: string, connection?: Mongoose): mongoose.MongooseModelClassModel<ReturnType<this["schema"]>, import("../types").MongooseModelClassPickMatching<this, Function>, import("../types").MongooseModelClassExtractVirtuals<this>, import("../types").BeAnObject, mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>, mongoose.IfAny<mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>, any, import("../types").MongooseModelClassExtractVirtuals<this> & import("../types").MongooseModelClassPickMatching<this, Function> extends infer T ? T extends import("../types").MongooseModelClassExtractVirtuals<this> & import("../types").MongooseModelClassPickMatching<this, Function> ? T extends Record<string, never> ? mongoose.Document<unknown, import("../types").BeAnObject, mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>> & mongoose.Require_id<mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>> : mongoose.IfAny<T, mongoose.Document<unknown, import("../types").BeAnObject, mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>> & mongoose.Require_id<mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>>, mongoose.Document<unknown, import("../types").BeAnObject, mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>> & Omit<mongoose.Require_id<mongoose.IfAny<ReturnType<this["schema"]>, any, mongoose.ObtainSchemaGeneric<ReturnType<this["schema"]>, "DocType">>>, keyof T> & T> : never : never>> & import("../types").MongooseModelClassPickMatching<U, Function>;
}
export default BaseModel;
//# sourceMappingURL=Base.d.ts.map