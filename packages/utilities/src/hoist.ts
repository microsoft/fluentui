const REACT_LIFECYCLE_EXCLUSIONS = [
  'setState',
  'render',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'getSnapshotBeforeUpdate',
  'UNSAFE_componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
];

/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 *
 * @public
 * @param destination - The instance of the object to hoist the methods onto.
 * @param source - The instance of the object where the methods are hoisted from.
 * @param exclusions - (Optional) What methods to exclude from being hoisted.
 * @returns An array of names of methods that were hoisted.
 */
export function hoistMethods(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  destination: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any,
  exclusions: string[] = REACT_LIFECYCLE_EXCLUSIONS,
): string[] {
  let hoisted: string[] = [];
  for (let methodName in source) {
    if (
      typeof source[methodName] === 'function' &&
      destination[methodName] === undefined &&
      (!exclusions || exclusions.indexOf(methodName) === -1)
    ) {
      hoisted.push(methodName);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      destination[methodName] = function (...args: any[]): void {
        source[methodName](...args);
      };
    }
  }

  return hoisted;
}

/**
 * Provides a method for convenience to unhoist hoisted methods.
 *
 * @public
 * @param source - The source object upon which methods were hoisted.
 * @param methodNames - An array of method names to unhoist.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unhoistMethods(source: any, methodNames: string[]): void {
  methodNames.forEach((methodName: string) => delete source[methodName]);
}
