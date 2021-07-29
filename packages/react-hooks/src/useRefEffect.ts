import * as React from 'react';

/**
 * A callback ref function that also has a .current member for the ref's current value.
 */
export type RefCallback<T> = ((value: T | null) => void) & React.RefObject<T>;

/**
 * Creates a ref, and calls a callback whenever the ref changes to a non-null value. The callback can optionally return
 * a cleanup function that'll be called before the value changes, and when the ref is unmounted.
 *
 * This can be used to work around a limitation that useEffect cannot depend on `ref.current` (see
 * https://github.com/facebook/react/issues/14387#issuecomment-503616820).
 *
 * Usage example:
 * ```ts
 * const myRef = useRefEffect<HTMLElement>(element => {
 *  ...
 *  return () => { ... cleanup ... };
 * });
 * ```
 * ```jsx
 * <div ref={myRef} />
 * ```
 *
 * @param callback - Called whenever the ref's value changes to non-null. Can optionally return a cleanup function.
 * @param initial - (Optional) The initial value for the ref.
 *
 * @returns A function that should be called to set the ref's value. The object also has a `.current` member that can be
 * used to access the ref's value (like a normal RefObject). It can be hooked up to an element's `ref` property.
 */
export function useRefEffect<T>(callback: (value: T) => (() => void) | void, initial: T | null = null): RefCallback<T> {
  type RefData = {
    ref: ((value: T | null) => void) & React.MutableRefObject<T | null>;
    callback: (value: T) => (() => void) | void;
    cleanup?: (() => void) | void;
  };
  const cleanup = React.useRef<RefData['cleanup']>();
  const [ref] = React.useState(() => ({
    // value
    value: initial,
    // last callback
    callback,
    // "memoized" public interface
    facade: {
      get current() {
        return ref.value;
      },
      set current(value) {
        if (ref.value !== value) {
          if (cleanup.current) {
            cleanup.current();
            cleanup.current = undefined;
          }

          ref.value = value;

          if (value !== null) {
            cleanup.current = ref.callback(value);
          }
        }
      },
    },
  }));

  ref.callback = callback;
  return (ref.facade as unknown) as RefCallback<T>;
}
