"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const has_1 = __importDefault(require("lodash/has"));
const lifecycle_1 = __importDefault(require("./lifecycle"));
const util_1 = __importDefault(require("./util"));
class MongooseModelClassMethods extends lifecycle_1.default {
    setStaticMethods(schema) {
        const obj = this.constructor;
        const properties = Object.getOwnPropertyNames(obj);
        properties.forEach((name) => {
            const method = Object.getOwnPropertyDescriptor(obj, name);
            if (method && util_1.default.isStaticMethod(name))
                schema.static(name, method.value);
        });
    }
    setInstanceMethods(schema) {
        const obj = this.constructor.prototype;
        const properties = Object.getOwnPropertyNames(obj);
        properties.forEach((name) => {
            const method = Object.getOwnPropertyDescriptor(obj, name);
            if (method && util_1.default.isInstanceMethod(name, method))
                schema.method(name, method.value);
        });
    }
    setVirtualMethods(schema) {
        const obj = this.constructor.prototype;
        const properties = Object.getOwnPropertyNames(obj);
        properties.forEach((name) => {
            const method = Object.getOwnPropertyDescriptor(obj, name);
            if (method && util_1.default.isVirtualMethod(name, method)) {
                const virtual = schema.virtual(name);
                // eslint-disable-next-line @typescript-eslint/unbound-method
                if ((0, has_1.default)(method, 'set') && method.set)
                    virtual.set(method.set);
                // eslint-disable-next-line @typescript-eslint/unbound-method
                if ((0, has_1.default)(method, 'get') && method.get)
                    virtual.get(method.get);
            }
        });
    }
}
exports.default = MongooseModelClassMethods;
//# sourceMappingURL=methods.js.map