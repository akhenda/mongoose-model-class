/// <reference path="mongoose.d.ts" />
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
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/aggregate" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/callback" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/collection" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/connection" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/cursor" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/document" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/error" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/expressions" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/helpers" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/middlewares" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/indexes" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/models" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/mongooseoptions" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/pipelinestage" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/populate" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/query" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/schemaoptions" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/schematypes" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/session" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/types" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/utility" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/validation" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/virtuals" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types=".pnpm/mongoose@6.12.9_@aws-sdk+client-sso-oidc@3.583.0/node_modules/mongoose/types/inferschematype" />
/// <reference types="recachegoose" />
import mongoose, { CallbackWithoutResultAndOptionalError, HydratedDocument, InferSchemaType, Model, Mongoose, RefType, Schema } from 'mongoose';
export type MongoosePlugin = Mongoose['plugin'];
export type DerivedConstructorFromInstanceType<T> = abstract new () => T;
export type Timestamps = {
    created_at: Date;
    updated_at: Date;
    createdAt?: Date;
    updatedAt?: Date;
};
export type MongooseModelClassTimestamps = Timestamps;
export type MongooseModelClassHookNextFunction = CallbackWithoutResultAndOptionalError;
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
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : T extends {
        [key in K]: infer U;
    } ? U extends (...args: any[]) => any ? never : K : never;
}[keyof T];
type Setters<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : T extends {
        [key in K]: infer U;
    } ? U extends (value: any) => void ? K : never : never;
}[keyof T];
type GettersAndSetters<T> = Getters<T> | Setters<T>;
type OnlyGettersAndSetters<T> = Pick<T, GettersAndSetters<T>>;
export type MongooseModelClassExtractVirtuals<T> = OnlyGettersAndSetters<T>;
export type MongooseModelClassPickMatching<T, V> = {
    [K in keyof T as T[K] extends V ? K : never]: T[K];
};
export type MongooseModelClassExtractMethods<T> = MongooseModelClassPickMatching<T, Function>;
export type MongooseModelClassExtractStatics<T extends AnyParamConstructor<any>> = MongooseModelClassExtractMethods<T>;
/**
 * Reference another Model
 */
export type Ref<PopulatedType, RawId extends RefType = (PopulatedType extends {
    _id?: RefType;
} ? NonNullable<PopulatedType['_id']> : mongoose.Types.ObjectId) | undefined> = mongoose.PopulatedDoc<PopulatedType, RawId>;
export type MongooseModelClassRef<T, U extends RefType> = Ref<T, U>;
export type MongooseModelClassModel<TSchema, TMethods, TVirtuals, TStatics, TQueryHelpers = BeAnObject, TOverrides = TVirtuals & TMethods, DocType = InferSchemaType<TSchema> & MongooseModelClassTimestamps, HDoc = HydratedDocument<DocType, TOverrides, TQueryHelpers>> = Model<DocType, TQueryHelpers, TMethods, TVirtuals, HDoc, TSchema> & TStatics;
export type MongooseModelClassDocumentType<ModelClass extends {
    schema(): Schema;
}, TSchema = ReturnType<ModelClass['schema']>, DocType = InferSchemaType<TSchema> & MongooseModelClassTimestamps, TQueryHelpers = BeAnObject, TMethods = MongooseModelClassExtractMethods<ModelClass>, TVirtuals = MongooseModelClassExtractVirtuals<ModelClass>, Overrides = TVirtuals & TMethods> = HydratedDocument<DocType, Overrides, TQueryHelpers> & DocType;
export type MongooseModelClassModelType<ModelClass extends {
    schema(): Schema;
}, TQueryHelpers = BeAnObject, TStatics = BeAnObject, TVirtuals = MongooseModelClassExtractVirtuals<ModelClass>, TMethods = MongooseModelClassExtractMethods<ModelClass>, TSchema = ReturnType<ModelClass['schema']>, DocType = InferSchemaType<TSchema> & MongooseModelClassTimestamps, HDoc = HydratedDocument<DocType, TVirtuals & TMethods, TQueryHelpers>> = Model<DocType, TQueryHelpers, TMethods, TVirtuals, HDoc, TSchema> & TStatics;
export type MongooseModelClassReturnModelType<T extends AnyParamConstructor<any>, TQueryHelpers = BeAnObject, TStatics = MongooseModelClassExtractStatics<T>, TVirtuals = MongooseModelClassExtractVirtuals<InstanceType<T>>, TMethods = MongooseModelClassExtractMethods<InstanceType<T>>> = MongooseModelClassModelType<InstanceType<T>, TQueryHelpers, TStatics, TVirtuals, TMethods>;
export {};
//# sourceMappingURL=index.d.ts.map