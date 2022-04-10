const has = require('lodash/has');

class Util {
  static isInstanceMethod(name, method) {
    return (name !== 'constructor' && name != 'schema' && !(method.set || method.get));
  }

  static isStaticMethod(name, method) {
    return (name !== 'prototype' && name != 'schema' && name !== 'length' && name != 'name');
  }

  static isVirtualMethod(name, method) {
    return (name !== 'constructor' && name != 'schema' && (has(method, 'set') || has(method, 'get')));
  }

}

module.exports = Util;
