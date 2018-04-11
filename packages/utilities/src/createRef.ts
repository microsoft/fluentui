export type RefObject<T> = {
  (component: T | null): void;
  value: T | null;
};

export function createRef<T>(): RefObject<T> {
  const refObject = ((element: T | null): void => {
    refObject.value = element;
  }) as RefObject<T>;
  refObject.value = null;

  return refObject;
}