"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const methods_1 = __importDefault(require("./methods"));
class MongooseModelClass extends methods_1.default {
    constructor() {
        super(...arguments);
        this.timestamps = true;
        this.indexUpdatedAtField = false;
        this.indexes = [];
        this.mongoosePlugins = [];
    }
    options() {
        return {};
    }
    getIndexes() {
        const indices = [];
        if (this.timestamps && this.indexUpdatedAtField) {
            indices.push([{ updated_at: 1 }, { unique: false }]);
        }
        const indicesSchema = joi_1.default.array()
            .items(joi_1.default.object().keys({ field: joi_1.default.object().required(), unique: joi_1.default.boolean() }))
            .unique();
        const validation = indicesSchema.validate(this.indexes);
        if (validation.error)
            throw validation.error;
        this.indexes.forEach((index) => {
            indices.push([index.field, { unique: index.unique || false }]);
        });
        return indices;
    }
    buildModel(name = this.constructor.name, connection = mongoose_1.default) {
        const schema = this.schema();
        this.setStaticMethods(schema);
        this.setInstanceMethods(schema);
        this.setVirtualMethods(schema);
        this.setLifeCycleCallbacks(schema);
        if (this.getIndexes().length > 0)
            this.getIndexes().forEach(([def, opts]) => schema.index(def, opts));
        if (this.mongoosePlugins.length > 0)
            this.mongoosePlugins.forEach((plugin) => schema.plugin(plugin));
        const model = connection.model(name, schema, this.options().collection);
        return model;
    }
}
Object.defineProperty(MongooseModelClass, 'adapter', {
    value: mongoose_1.default,
    writable: false,
});
Object.defineProperty(MongooseModelClass, 'Schema', {
    value: mongoose_1.default.Schema,
    writable: false,
});
Object.defineProperty(MongooseModelClass, 'types', {
    value: mongoose_1.default.Schema.Types,
    writable: false,
});
Object.defineProperty(MongooseModelClass, 'parseObjectId', {
    value: (id) => {
        const { ObjectId } = mongoose_1.default.Types;
        return ObjectId.isValid(id) ? new ObjectId(id) : null;
    },
    writable: false,
});
__exportStar(require("./types"), exports);
exports.default = MongooseModelClass;
//# sourceMappingURL=index.js.map