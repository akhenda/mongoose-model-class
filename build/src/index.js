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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const has_1 = __importDefault(require("lodash/has"));
const mongoose_1 = __importStar(require("mongoose"));
const util_1 = __importDefault(require("./util"));
function setStaticMethods(target, schema) {
    const o = target.constructor;
    const properties = Object.getOwnPropertyNames(o);
    properties.forEach((name) => {
        const method = Object.getOwnPropertyDescriptor(o, name);
        if (method && util_1.default.isStaticMethod(name))
            schema.static(name, method.value);
    });
}
function setInstanceMethods(target, schema) {
    const o = target.constructor.prototype;
    const properties = Object.getOwnPropertyNames(o);
    properties.forEach((name) => {
        const method = Object.getOwnPropertyDescriptor(o, name);
        if (method && util_1.default.isInstanceMethod(name, method))
            schema.method(name, method.value);
    });
}
function setVirtualMethods(target, schema) {
    const o = target.constructor.prototype;
    const properties = Object.getOwnPropertyNames(o);
    properties.forEach((name) => {
        const method = Object.getOwnPropertyDescriptor(o, name);
        if (method && util_1.default.isVirtualMethod(name, method)) {
            const v = schema.virtual(name);
            if ((0, has_1.default)(method, 'set') && method.set)
                v.set(method.set);
            if ((0, has_1.default)(method, 'get') && method.get)
                v.get(method.get);
        }
    });
}
function setLifeCycleCallbacks(target, schema) {
    schema.pre('save', async function (next) {
        await target.beforeSave(this, next);
    });
    schema.post('save', async function (doc, next) {
        await target.afterSave(doc, next);
    });
    schema.pre('update', async function (next) {
        await target.beforeUpdate(this, next);
    });
    schema.post('update', async function (doc, next) {
        await target.afterUpdate(doc, next);
    });
    schema.pre('find', async function (next) {
        await target.beforeFind(this, next);
    });
    schema.post('find', async function (doc, next) {
        await target.afterFind(doc, next);
    });
    schema.pre('findOne', async function (next) {
        await target.beforeFindOne(this, next);
    });
    schema.post('findOne', async function (doc, next) {
        await target.afterFindOne(doc, next);
    });
    schema.pre('findOneAndDelete', async function (next) {
        await target.beforeFindOneAndDelete(this, next);
    });
    schema.post('findOneAndDelete', async function (doc, next) {
        await target.afterFindOneAndDelete(doc, next);
    });
    schema.pre('findOneAndRemove', async function (next) {
        await target.beforeFindOneAndRemove(this, next);
    });
    schema.post('findOneAndRemove', async function (doc, next) {
        await target.afterFindOneAndRemove(doc, next);
    });
    schema.pre('findOneAndReplace', async function (next) {
        await target.beforeFindOneAndReplace(this, next);
    });
    schema.post('findOneAndReplace', async function (doc, next) {
        await target.afterFindOneAndReplace(doc, next);
    });
    schema.pre('findOneAndUpdate', async function (next) {
        await target.beforeFindOneAndUpdate(this, next);
    });
    schema.post('findOneAndUpdate', async function (doc, next) {
        await target.afterFindOneAndUpdate(doc, next);
    });
    schema.pre('remove', async function (next) {
        await target.beforeRemove(this, next);
    });
    schema.post('remove', async function (doc, next) {
        await target.afterRemove(doc, next);
    });
    schema.pre('aggregate', async function () {
        const stage = await target.beforeAggregate();
        if (stage)
            this.pipeline().unshift(stage);
    });
    schema.post('aggregate', async function () {
        await target.afterAggregate();
    });
    if (target.beforeAllFinds) {
        schema.pre(/^find/, async function (next) {
            await target.beforeAllFinds(this, next);
        });
    }
    if (target.afterAllFinds) {
        schema.post(/^find/, async function (doc, next) {
            await target.afterAllFinds(doc, next);
        });
    }
}
function buildSchema(target) {
    const schema = target.schema();
    setStaticMethods(target, schema);
    setInstanceMethods(target, schema);
    setVirtualMethods(target, schema);
    setLifeCycleCallbacks(target, schema);
    target.config(schema);
    return schema;
}
function buildModel(connection, plugins, name, target) {
    const schema = buildSchema(target);
    if (target.getIndexes().length > 0) {
        target.getIndexes().forEach((index) => schema.index(index[0], index[1]));
    }
    if (plugins.length > 0)
        plugins.forEach((plugin) => schema.plugin(plugin));
    return connection.model(name, schema, target.options().collection);
}
class MongooseModelClass {
    constructor() {
        this.indexUpdatedAtField = false;
        this.indexes = [];
        this.mongoosePlugins = [];
    }
    beforeSave(_, next) {
        next();
    }
    afterSave(_, next) {
        next();
    }
    beforeUpdate(_, next) {
        next();
    }
    afterUpdate(_, next) {
        next();
    }
    beforeFind(_, next) {
        next();
    }
    afterFind(_, next) {
        next();
    }
    beforeFindOne(_, next) {
        next();
    }
    afterFindOne(_, next) {
        next();
    }
    beforeFindOneAndDelete(_, next) {
        next();
    }
    afterFindOneAndDelete(_, next) {
        next();
    }
    beforeFindOneAndRemove(_, next) {
        next();
    }
    afterFindOneAndRemove(_, next) {
        next();
    }
    beforeFindOneAndReplace(_, next) {
        next();
    }
    afterFindOneAndReplace(_, next) {
        next();
    }
    beforeFindOneAndUpdate(_, next) {
        next();
    }
    afterFindOneAndUpdate(_, next) {
        next();
    }
    beforeAllFinds(_, next) {
        next();
    }
    afterAllFinds(_, next) {
        next();
    }
    beforeRemove(_, next) {
        next();
    }
    afterRemove(_, next) {
        next();
    }
    beforeAggregate() { }
    afterAggregate() { }
    /* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */
    // @ts-ignore
    config(schema) { }
    /* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars */
    getIndexes() {
        const indices = [];
        if (this.options().timestamps && this.indexUpdatedAtField) {
            indices.push([{ updated_at: 1 }, { unique: false }]);
        }
        const indicesSchema = joi_1.default.array()
            .items(joi_1.default.object().keys({
            field: joi_1.default.object().required(),
            unique: joi_1.default.boolean(),
        }))
            .unique();
        const validation = indicesSchema.validate(this.indexes);
        if (validation.error)
            throw validation.error;
        this.indexes.forEach((index) => {
            indices.push([index.field, { unique: index.unique || false }]);
        });
        return indices;
    }
    build(connection = mongoose_1.default, name = this.constructor.name) {
        return buildModel(connection, this.mongoosePlugins, name, this);
    }
}
Object.defineProperty(MongooseModelClass, 'adapter', {
    value: mongoose_1.default,
    writable: false,
});
Object.defineProperty(MongooseModelClass, 'Schema', {
    value: mongoose_1.Schema,
    writable: false,
});
Object.defineProperty(MongooseModelClass, 'types', {
    value: mongoose_1.Schema.Types,
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