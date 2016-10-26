const REACT_LIFECYCLE_EXCLUSIONS = [
  'setState',
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
 * @param destination The instance of the object to hoist the methods onto.
 * @param source The instance of the object where the methods are hoisted from.
 * @param exclusions (Optional) What methods to exclude from being hoisted.
 * @returns {string[]} An array of names of methods that were hoisted.
 */
export function hoistMethods(destination, source, exclusions: string[] = REACT_LIFECYCLE_EXCLUSIONS): string[] {
  let hoisted: string[] = [];
  for (let methodName in source) {
    if (
      typeof source[methodName] === 'function' &&
      destination[methodName] === undefined &&
      (!exclusions || exclusions.indexOf(methodName) === -1)
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
 * @param {any} source The source object upon which methods were hoisted.
 * @param {string[]} methodNames An array of method names to unhoist.
 */
export function unhoistMethods(source: any, methodNames: string[]): void {
  methodNames
    .forEach((methodName) => delete source[methodName]);
}
