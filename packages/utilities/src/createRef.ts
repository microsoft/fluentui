export type RefObject<T> = {
  (component: T | null): void;
  current: T | null;
};

export function createRef<T>(): RefObject<T> {
  const refObject = ((element: T | null): void => {
    refObject.current = element;
  }) as RefObject<T>;
  refObject.current = null;

  return refObject;
}