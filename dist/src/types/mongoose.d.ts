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
declare module 'mongoose' {
    interface AggregatePaginateResult<T> {
        docs: T[];
        totalDocs: number;
        limit: number;
        page?: number | undefined;
        totalPages: number;
        nextPage?: number | null | undefined;
        prevPage?: number | null | undefined;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        meta?: any;
    }
    interface MongooseModelClassModel<T extends Schema, Methods = {}, Virtuals = {}, QueryHelpers = {}, DocType = InferSchemaType<T>, HDoc = HydratedDocument<DocType, Virtuals & Methods, QueryHelpers>> extends Model<DocType, QueryHelpers, Methods, Virtuals, HDoc, Schema> {
        aggregatePaginate<UserType = DocType>(query?: Aggregate<UserType[]>, options?: PaginateOptions, callback?: (err: any, result: AggregatePaginateResult<UserType>) => void): Promise<AggregatePaginateResult<UserType>>;
        paginate<UserType = DocType>(query?: FilterQuery<DocType>, options?: PaginateOptions, callback?: (err: any, result: PaginateResult<PaginateDocument<UserType, Methods, PaginateOptions>>) => void): Promise<PaginateResult<PaginateDocument<UserType, Methods, PaginateOptions>>>;
    }
    /**
     * ==============================================
     * TypeScript Support for ReCacheGoose
     * ==============================================
     */
    interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType, QueryOp = 'find', TInstanceMethods = Record<string, never>> {
        cache(ttl: number, customKey?: string): this;
        cache(customKey: string): this;
        setDerivedKey(derivedKey: string): this;
        cacheGetScript(sha: string, ...args: any): this;
        postCacheSetScript(sha: string, ...args: any): this;
        postCacheSetDeriveLastArg(derivedKey: string): this;
    }
    interface Aggregate<ResultType> {
        cache(ttl: number, customKey?: string): this;
        cache(customKey: string): this;
    }
    interface DocumentQuery<T, DocType extends Document, QueryHelpers = {}> {
        orFail(err?: Error | (() => Error)): DocumentQuery<NonNullable<T>, DocType, QueryHelpers>;
        cache(ttl: number, customKey: string): this;
        cache(customKey: string): this;
        cache(ttl: number): this;
    }
}
import mongoose = require('mongoose');
declare function _(schema: mongoose.Schema): void;
export = _;
declare namespace _ {
    const aggregatePaginate: {
        options: mongoose.PaginateOptions;
    };
    const paginate: {
        options: mongoose.PaginateOptions;
    };
    const paginateSubDocs: {
        options: mongoose.PaginateOptions;
    };
    class PaginationParameters<T, O extends mongoose.PaginateOptions> {
        constructor(request: {
            query?: Record<string, any>;
        });
        getOptions: () => O;
        getQuery: () => mongoose.FilterQuery<T>;
        get: () => [mongoose.FilterQuery<T>, O];
    }
}
//# sourceMappingURL=mongoose.d.ts.map