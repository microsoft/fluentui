import { IRefObject } from './createRef';

/**
 * Function merge multiple IRefObjects into one ref function. This allows one ref to
 * be passed to React, which updates multiple refs.
 */
export function mergeRefs<T>(...refs: (IRefObject<T> | undefined)[]): IRefObject<T> {
  return (value: T) => {
    refs.forEach((ref: IRefObject<T>) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        // work around the immutability of the React.RefObject type
        ((ref as unknown) as { current: T }).current = value;
      }
    });
  };
}
