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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const mongoose_update_versioning_1 = __importDefault(require("mongoose-update-versioning"));
const index_1 = __importDefault(require("../index"));
class BaseModel extends index_1.default {
    constructor() {
        super();
        this.timestamps = true;
        this.indexUpdatedAtField = true;
        this.mongoosePlugins = [mongoose_paginate_v2_1.default, mongoose_aggregate_paginate_v2_1.default, mongoose_update_versioning_1.default, mongoose_unique_validator_1.default];
    }
    options() {
        const opts = {};
        if (this.collectionName)
            opts.collection = this.collectionName;
        if (this.timestamps)
            opts.timestamps = { createdAt: 'created_at', updatedAt: 'updated_at' };
        return opts;
    }
    schema() {
        return new mongoose_1.Schema({});
    }
    build(modelName = this.constructor.name, connection = mongoose_1.default) {
        return super.buildModel(modelName, connection);
    }
}
exports.default = BaseModel;
//# sourceMappingURL=Base.js.map