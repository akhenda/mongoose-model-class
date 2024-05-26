"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongooseModelClassLifeCycle {
    setLifeCycleCallbacks(schema) {
        /**
         * SAVE
         */
        if (this.beforeSave)
            schema.pre('save', this.beforeSave);
        if (this.afterSave)
            schema.post('save', this.afterSave);
        /**
         * UPDATE ONE
         */
        if (this.beforeUpdateOne)
            schema.pre('updateOne', this.beforeUpdateOne);
        if (this.afterUpdateOne)
            schema.post('updateOne', this.afterUpdateOne);
        /**
         * FIND
         */
        if (this.beforeFind)
            schema.pre('find', this.beforeFind);
        if (this.afterFind)
            schema.post('find', this.afterFind);
        /**
         * FIND ONE
         */
        if (this.beforeFindOne)
            schema.pre('findOne', this.beforeFindOne);
        if (this.afterFindOne)
            schema.post('findOne', this.afterFindOne);
        /**
         * FIND ONE AND DELETE
         */
        if (this.beforeFindOneAndDelete)
            schema.pre('findOneAndDelete', this.beforeFindOneAndDelete);
        if (this.afterFindOneAndDelete)
            schema.post('findOneAndDelete', this.afterFindOneAndDelete);
        /**
         * FIND ONE AND REPLACE
         */
        if (this.beforeFindOneAndReplace)
            schema.pre('findOneAndReplace', this.beforeFindOneAndReplace);
        if (this.afterFindOneAndReplace)
            schema.post('findOneAndReplace', this.afterFindOneAndReplace);
        /**
         * FIND ONE AND UPDATE
         */
        if (this.beforeFindOneAndUpdate)
            schema.pre('findOneAndUpdate', this.beforeFindOneAndUpdate);
        if (this.afterFindOneAndUpdate)
            schema.post('findOneAndUpdate', this.afterFindOneAndUpdate);
        /**
         * REMOVE
         */
        if (this.beforeDeleteOne)
            schema.pre('deleteOne', this.beforeDeleteOne);
        if (this.afterDeleteOne)
            schema.post('deleteOne', this.afterDeleteOne);
        /**
         * AGGREGATE
         */
        if (this.beforeAggregate)
            schema.pre('aggregate', this.beforeAggregate);
        if (this.afterAggregate)
            schema.post('aggregate', this.afterAggregate);
        /**
         * ALL FINDS
         */
        if (this.beforeAllFinds)
            schema.pre(/^find/, this.beforeAllFinds);
        if (this.afterAllFinds)
            schema.post(/^find/, this.afterAllFinds);
    }
}
exports.default = MongooseModelClassLifeCycle;
//# sourceMappingURL=lifecycle.js.map