import has from 'lodash/has';

const Util = {
  isInstanceMethod(name: string, method: PropertyDescriptor) {
    return name !== 'constructor' && name !== 'schema' && !(method.set || method.get);
  },

  isStaticMethod(name: string) {
    return name !== 'prototype' && name !== 'schema' && name !== 'length' && name !== 'name';
  },

  isVirtualMethod(name: string, method: PropertyDescriptor) {
    return name !== 'constructor' && name !== 'schema' && (has(method, 'set') || has(method, 'get'));
  },
};

export default Util;
