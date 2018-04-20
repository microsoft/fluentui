export type RefObject<T> = {
  (component: T | null): void;
  current: T | null;

  /**
   * @deprecated Use .current as that is consistent the official React Api.
   */
  value: T | null;
};

/**
 * This is a polyfill for the React.createRef() api.
 * For more info on React.createRef() see the official React documentation
 * on creating and accessing refs.
 * @see https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
 * @see https://reactjs.org/docs/refs-and-the-dom.html#accessing-refs
 */
export function createRef<T>(): RefObject<T> {
  const refObject = ((element: T | null): void => {
    refObject.current = element;
  }) as RefObject<T>;

  // This getter is here to support the deprecated value prop on the refObject.
  Object.defineProperty(refObject, 'value', {
    get(): T | null {
      return refObject.current;
    }
  });

  refObject.current = null;

  return refObject;
}