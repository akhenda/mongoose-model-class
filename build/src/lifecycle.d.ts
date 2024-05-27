/// <reference path="types/mongoose.d.ts" />
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
import { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';
import { MongooseModelClassDocumentType } from './types';
type Next = CallbackWithoutResultAndOptionalError;
declare abstract class MongooseModelClassLifeCycle {
    beforeSave?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterSave?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeUpdateOne?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterUpdateOne?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeFind?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterFind?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeFindOne?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterFindOne?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeFindOneAndDelete?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterFindOneAndDelete?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeFindOneAndRemove?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterFindOneAndRemove?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeFindOneAndReplace?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterFindOneAndReplace?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeFindOneAndUpdate?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterFindOneAndUpdate?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeDeleteOne?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterDeleteOne?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeAllFinds?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterAllFinds?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    beforeAggregate?(this: MongooseModelClassDocumentType<any>, next: Next): void;
    afterAggregate?(this: void, doc: MongooseModelClassDocumentType<any>, next: Next): void;
    protected setLifeCycleCallbacks<T extends Schema>(schema: T): void;
}
export default MongooseModelClassLifeCycle;
//# sourceMappingURL=lifecycle.d.ts.map