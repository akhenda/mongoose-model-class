/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Mongoose, Schema, SchemaOptions } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import uniqueValidator from 'mongoose-unique-validator';
import updateVersioningPlugin from 'mongoose-update-versioning';

import MongooseModelClass from '../index';
import { MongoosePlugin } from '../types';

abstract class BaseModel<U> extends MongooseModelClass<U> {
  abstract collectionName: string;

  timestamps: boolean;
  indexUpdatedAtField: boolean;
  mongoosePlugins: MongoosePlugin[];

  constructor() {
    super();

    this.timestamps = true;
    this.indexUpdatedAtField = true;
    this.mongoosePlugins = [mongoosePaginate, mongooseAggregatePaginate, updateVersioningPlugin, uniqueValidator];
  }

  options() {
    const opts: SchemaOptions = {};

    if (this.collectionName) opts.collection = this.collectionName;
    if (this.timestamps) opts.timestamps = { createdAt: 'created_at', updatedAt: 'updated_at' };

    return opts;
  }

  schema() {
    return new Schema({});
  }

  build(modelName: string = this.constructor.name, connection: Mongoose = mongoose) {
    return super.buildModel(modelName, connection);
  }
}

export default BaseModel;
