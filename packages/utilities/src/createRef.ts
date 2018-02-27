export type RefCreator<T> = {
  (component: T): void;
  value: T | null;
};

export function createRef<T>(): RefCreator<T> {
  const refCreator = ((element: T): void => {
    refCreator.value = element;
  }) as RefCreator<T>;
  refCreator.value = null;

  return refCreator;
}