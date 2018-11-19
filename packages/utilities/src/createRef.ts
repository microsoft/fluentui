export type IRefObject<T> = React.RefObject<T> | RefObject<T> | ((ref: T | null) => void);

export type RefObject<T> = {
  (component: T | null): void;
  current: T | null;

  /**
   * @deprecated Use .current as that is consistent the official React Api.
   */
  value: T | null;
};

/**
 * @deprecated Use React.createRef.
 * May be removed in 6 months (Jan '19).
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
