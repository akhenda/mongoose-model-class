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
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from 'mongoose';
import { DerivedClassModel, DerivedDocument } from '../types';
import MongooseModelClass from '..';
export declare class User extends MongooseModelClass<typeof User> {
    static getById(this: DerivedClassModel<User, typeof User>, id: string): Promise<import("mongoose").Document<unknown, any, import("..").DerivedClassDocument<User>> & {
        dob: Date;
        email: string;
        enabled: boolean;
        firstName: string;
        isOnline: boolean;
        likes: number;
        password: string;
        phone: string;
        status: "done" | "ready" | "processing" | "failed" | "canceled";
        username: string;
        address?: string | undefined;
        favouriteFood?: "chapati" | "rice" | "ugali" | "fish" | "mukimo" | undefined;
        lastName?: string | undefined;
    } & import("..").Timestamps & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    options(): {};
    schema(): Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
        dob: Date;
        email: string;
        enabled: boolean;
        firstName: string;
        isOnline: boolean;
        likes: number;
        password: string;
        phone: string;
        status: "done" | "ready" | "processing" | "failed" | "canceled";
        username: string;
        address?: string | undefined;
        favouriteFood?: "chapati" | "rice" | "ugali" | "fish" | "mukimo" | undefined;
        lastName?: string | undefined;
    }>;
    beforeSave(doc: DerivedDocument<User>, next: any): void;
    afterSave(doc: DerivedDocument<User>, next: any): void;
    get fullname(): string;
    set fullname(value: string);
    signOff(this: DerivedDocument<User>): Promise<void>;
    disable(this: DerivedDocument<User>): Promise<any>;
}
//# sourceMappingURL=User.d.ts.map