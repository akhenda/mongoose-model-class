"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const has_1 = __importDefault(require("lodash/has"));
class Util {
    static isInstanceMethod(name, method) {
        return name !== 'constructor' && name !== 'schema' && !(method.set || method.get);
    }
    static isStaticMethod(name) {
        return name !== 'prototype' && name !== 'schema' && name !== 'length' && name !== 'name';
    }
    static isVirtualMethod(name, method) {
        return name !== 'constructor' && name !== 'schema' && ((0, has_1.default)(method, 'set') || (0, has_1.default)(method, 'get'));
    }
}
exports.default = Util;
//# sourceMappingURL=util.js.map