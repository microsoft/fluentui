const REACT_LIFECYCLE_EXCLUSIONS = [
  'setState',
  'forceUpdate',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
];

/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 * @returns {string[]} An array of names of methods that were hoisted.
 */
export function hoistMethods(destination, source, exclusions = REACT_LIFECYCLE_EXCLUSIONS): string[] {
  let hoisted: string[] = [];
  for (let methodName in source) {
    if (
      typeof source[methodName] === 'function' &&
      destination[methodName] === undefined &&
      exclusions.indexOf(methodName) === -1
    ) {
      hoisted.push(methodName);
      /* tslint:disable:no-function-expression */
      destination[methodName] = function () { source[methodName].apply(source, arguments); };
      /* tslint:enable */
    }
  }

  return hoisted;
}

/**
 * Provides a method for convenience to unhoist hoisted methods.
 * @param {Object} source The source object upon which methods were hoisted.
 * @param {string[]} methodNames An array of method names to unhoist.
 */
export function unhoistMethods(source: Object, methodNames: string[]): void {
  for (let methodName of methodNames) {
    if (source.hasOwnProperty(methodName) && typeof source[methodName] === 'function') {
      source[methodName] = null; // or should this be undefined?
    }
  }
}
