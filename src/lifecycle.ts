/* eslint-disable @typescript-eslint/unbound-method */
import { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';

import { MongooseModelClassDocumentType } from './types';

type Next = CallbackWithoutResultAndOptionalError;

abstract class MongooseModelClassLifeCycle {
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

  protected setLifeCycleCallbacks<T extends Schema>(schema: T) {
    /**
     * SAVE
     */
    if (this.beforeSave) schema.pre('save', this.beforeSave);
    if (this.afterSave) schema.post('save', this.afterSave);

    /**
     * UPDATE ONE
     */
    if (this.beforeUpdateOne) schema.pre('updateOne', this.beforeUpdateOne);
    if (this.afterUpdateOne) schema.post('updateOne', this.afterUpdateOne);

    /**
     * FIND
     */
    if (this.beforeFind) schema.pre('find', this.beforeFind);
    if (this.afterFind) schema.post('find', this.afterFind);

    /**
     * FIND ONE
     */
    if (this.beforeFindOne) schema.pre('findOne', this.beforeFindOne);
    if (this.afterFindOne) schema.post('findOne', this.afterFindOne);

    /**
     * FIND ONE AND DELETE
     */
    if (this.beforeFindOneAndDelete) schema.pre('findOneAndDelete', this.beforeFindOneAndDelete);
    if (this.afterFindOneAndDelete) schema.post('findOneAndDelete', this.afterFindOneAndDelete);

    /**
     * FIND ONE AND REPLACE
     */
    if (this.beforeFindOneAndReplace) schema.pre('findOneAndReplace', this.beforeFindOneAndReplace);
    if (this.afterFindOneAndReplace) schema.post('findOneAndReplace', this.afterFindOneAndReplace);

    /**
     * FIND ONE AND UPDATE
     */
    if (this.beforeFindOneAndUpdate) schema.pre('findOneAndUpdate', this.beforeFindOneAndUpdate);
    if (this.afterFindOneAndUpdate) schema.post('findOneAndUpdate', this.afterFindOneAndUpdate);

    /**
     * REMOVE
     */
    if (this.beforeDeleteOne) schema.pre('deleteOne', this.beforeDeleteOne);
    if (this.afterDeleteOne) schema.post('deleteOne', this.afterDeleteOne);

    /**
     * AGGREGATE
     */
    if (this.beforeAggregate) schema.pre('aggregate', this.beforeAggregate);
    if (this.afterAggregate) schema.post('aggregate', this.afterAggregate);

    /**
     * ALL FINDS
     */
    if (this.beforeAllFinds) schema.pre(/^find/, this.beforeAllFinds);
    if (this.afterAllFinds) schema.post(/^find/, this.afterAllFinds);
  }
}

export default MongooseModelClassLifeCycle;
