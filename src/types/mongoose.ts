/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-redeclare */
/* eslint-disable sort-class-members/sort-class-members */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
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
    // [customLabel: string]: T[] | number | boolean | null | undefined;
  }

  interface MongooseModelClassModel<
    T extends Schema,
    Methods = {},
    Virtuals = {},
    QueryHelpers = {},
    DocType = InferSchemaType<T>,
    HDoc = HydratedDocument<DocType, Virtuals & Methods, QueryHelpers>,
  > extends Model<DocType, QueryHelpers, Methods, Virtuals, HDoc, Schema> {
    aggregatePaginate<UserType = DocType>(
      query?: Aggregate<UserType[]>,
      options?: PaginateOptions,
      callback?: (err: any, result: AggregatePaginateResult<UserType>) => void,
    ): Promise<AggregatePaginateResult<UserType>>;
    paginate<UserType = DocType>(
      query?: FilterQuery<DocType>,
      options?: PaginateOptions,
      callback?: (err: any, result: PaginateResult<PaginateDocument<UserType, Methods, PaginateOptions>>) => void,
    ): Promise<PaginateResult<PaginateDocument<UserType, Methods, PaginateOptions>>>;
  }

  /**
   * ==============================================
   * TypeScript Support for ReCacheGoose
   * ==============================================
   */

  interface Query<
    ResultType,
    DocType,
    THelpers = {},
    RawDocType = DocType,
    QueryOp = 'find',
    TInstanceMethods = Record<string, never>,
  > {
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
    // not cachegoose related fix, but usefull. thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34205#issuecomment-621976826
    orFail(err?: Error | (() => Error)): DocumentQuery<NonNullable<T>, DocType, QueryHelpers>;
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    cache(ttl: number, customKey: string): this;
    cache(customKey: string): this;
    cache(ttl: number): this;
  }
}

import mongoose = require('mongoose');

declare function _(schema: mongoose.Schema): void;

export = _;

declare namespace _ {
  const aggregatePaginate: { options: mongoose.PaginateOptions };
  const paginate: { options: mongoose.PaginateOptions };
  const paginateSubDocs: { options: mongoose.PaginateOptions };
  class PaginationParameters<T, O extends mongoose.PaginateOptions> {
    constructor(request: { query?: Record<string, any> });
    getOptions: () => O;
    getQuery: () => mongoose.FilterQuery<T>;
    get: () => [mongoose.FilterQuery<T>, O];
  }
}
