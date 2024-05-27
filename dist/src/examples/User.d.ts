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
import mongoose, { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { MongooseModelClassDocumentType, MongooseModelClassReturnModelType } from '../types';
import BaseModel from './Base';
export declare class User extends BaseModel<typeof User> {
    collectionName: string;
    /**
     * Get a user by their ID
     */
    static getById(this: MongooseModelClassReturnModelType<typeof User>, id: string | mongoose.Types.ObjectId): Promise<mongoose.Document<unknown, import("../types").BeAnObject, {
        dob: Date;
        email: string;
        enabled: boolean;
        firstName: string;
        isOnline: boolean;
        likes: number;
        password: string;
        phone: string;
        status: "ready" | "processing" | "done" | "failed" | "canceled" | "disabled";
        username: string;
        address?: string | null | undefined;
        favouriteFood?: "chapati" | "rice" | "ugali" | "fish" | "mukimo" | null | undefined;
        lastName?: string | null | undefined;
    } & import("../types").Timestamps> & Omit<{
        dob: Date;
        email: string;
        enabled: boolean;
        firstName: string;
        isOnline: boolean;
        likes: number;
        password: string;
        phone: string;
        status: "ready" | "processing" | "done" | "failed" | "canceled" | "disabled";
        username: string;
        address?: string | null | undefined;
        favouriteFood?: "chapati" | "rice" | "ugali" | "fish" | "mukimo" | null | undefined;
        lastName?: string | null | undefined;
    } & import("../types").Timestamps & {
        _id: mongoose.Types.ObjectId;
    }, "schema" | "options" | "getIndexes" | "buildModel" | "setStaticMethods" | "setInstanceMethods" | "setVirtualMethods" | "beforeSave" | "afterSave" | "build" | "signOff" | "disable" | ("timestamps" | "collectionName" | "indexUpdatedAtField" | "mongoosePlugins" | "fullname" | undefined)> & import("../types").MongooseModelClassExtractVirtuals<User> & import("../types").MongooseModelClassPickMatching<User, Function>>;
    schema(): mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
        dob: Date;
        email: string;
        enabled: boolean;
        firstName: string;
        isOnline: boolean;
        likes: number;
        password: string;
        phone: string;
        status: "ready" | "processing" | "done" | "failed" | "canceled" | "disabled";
        username: string;
        address?: string | null | undefined;
        favouriteFood?: "chapati" | "rice" | "ugali" | "fish" | "mukimo" | null | undefined;
        lastName?: string | null | undefined;
    }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
        dob: Date;
        email: string;
        enabled: boolean;
        firstName: string;
        isOnline: boolean;
        likes: number;
        password: string;
        phone: string;
        status: "ready" | "processing" | "done" | "failed" | "canceled" | "disabled";
        username: string;
        address?: string | null | undefined;
        favouriteFood?: "chapati" | "rice" | "ugali" | "fish" | "mukimo" | null | undefined;
        lastName?: string | null | undefined;
    }>> & mongoose.FlatRecord<{
        dob: Date;
        email: string;
        enabled: boolean;
        firstName: string;
        isOnline: boolean;
        likes: number;
        password: string;
        phone: string;
        status: "ready" | "processing" | "done" | "failed" | "canceled" | "disabled";
        username: string;
        address?: string | null | undefined;
        favouriteFood?: "chapati" | "rice" | "ugali" | "fish" | "mukimo" | null | undefined;
        lastName?: string | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    }>;
    beforeSave(this: MongooseModelClassDocumentType<this>, next: CallbackWithoutResultAndOptionalError): void;
    afterSave(doc: MongooseModelClassDocumentType<this>, next: CallbackWithoutResultAndOptionalError): void;
    get fullname(): string;
    set fullname(value: string);
    /**
     * This signs off/out a user
     */
    signOff(this: MongooseModelClassDocumentType<this>): Promise<void>;
    /**
     * This disables a user account
     */
    disable(this: MongooseModelClassDocumentType<this>): Promise<any>;
}
//# sourceMappingURL=User.d.ts.map