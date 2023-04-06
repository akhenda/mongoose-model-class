import has from 'lodash/has';

export default class Util {
  static isInstanceMethod(name: string, method: PropertyDescriptor) {
    return name !== 'constructor' && name !== 'schema' && !(method.set || method.get);
  }

  static isStaticMethod(name: string) {
    return name !== 'prototype' && name !== 'schema' && name !== 'length' && name !== 'name';
  }

  static isVirtualMethod(name: string, method: PropertyDescriptor) {
    return name !== 'constructor' && name !== 'schema' && (has(method, 'set') || has(method, 'get'));
  }
}
