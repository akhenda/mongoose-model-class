import has from 'lodash/has';
import { Schema } from 'mongoose';

import MongooseModelClassLifeCycle from './lifecycle';
import Util from './util';

abstract class MongooseModelClassMethods extends MongooseModelClassLifeCycle {
  setStaticMethods<T extends Schema>(schema: T) {
    const obj = this.constructor;
    const properties = Object.getOwnPropertyNames(obj);

    properties.forEach((name) => {
      const method = Object.getOwnPropertyDescriptor(obj, name);

      if (method && Util.isStaticMethod(name)) schema.static(name, method.value);
    });
  }

  setInstanceMethods<T extends Schema>(schema: T) {
    const obj = this.constructor.prototype;
    const properties = Object.getOwnPropertyNames(obj);

    properties.forEach((name) => {
      const method = Object.getOwnPropertyDescriptor(obj, name);

      if (method && Util.isInstanceMethod(name, method)) schema.method(name, method.value);
    });
  }

  setVirtualMethods<T extends Schema>(schema: T) {
    const obj = this.constructor.prototype;
    const properties = Object.getOwnPropertyNames(obj);

    properties.forEach((name) => {
      const method = Object.getOwnPropertyDescriptor(obj, name);

      if (method && Util.isVirtualMethod(name, method)) {
        const virtual = schema.virtual(name);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        if (has(method, 'set') && method.set) virtual.set(method.set);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        if (has(method, 'get') && method.get) virtual.get(method.get);
      }
    });
  }
}

export default MongooseModelClassMethods;
