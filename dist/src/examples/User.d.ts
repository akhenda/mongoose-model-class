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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { MongooseModelClassDocumentType, MongooseModelClassReturnModelType } from '../types';
import MongooseModelClass from '..';
export declare class User extends MongooseModelClass<typeof User> {
    static getById(this: MongooseModelClassReturnModelType<User>, id: string): Promise<import("mongoose").Document<any, import("..").BeAnObject, any> & {
        likes: number;
        status: boolean;
        email?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        password?: string | undefined;
        phone?: string | undefined;
        username?: string | undefined;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    options(): {};
    schema(): {
        email: {
            required: boolean;
            type: StringConstructor;
        };
        firstName: {
            required: boolean;
            type: StringConstructor;
        };
        lastName: {
            required: boolean;
            type: StringConstructor;
        };
        likes: {
            default: number;
            type: NumberConstructor;
        };
        password: {
            required: boolean;
            type: StringConstructor;
        };
        phone: {
            required: boolean;
            type: StringConstructor;
        };
        status: {
            default: boolean;
            type: BooleanConstructor;
        };
        username: {
            required: boolean;
            type: StringConstructor;
        };
    };
    beforeSave(doc: MongooseModelClassDocumentType<User>, next: any): void;
    afterSave(doc: MongooseModelClassDocumentType<User>, next: any): void;
    get fullname(): string;
    set fullname(value: string);
    disable(this: MongooseModelClassDocumentType<User>): Promise<any>;
}
//# sourceMappingURL=User.d.ts.map