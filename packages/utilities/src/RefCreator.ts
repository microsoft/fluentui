export type RefCreator<T> = {
  (component: React.ReactNode): void;
  value: T | null;
};

export function createRef<T = HTMLElement>(): RefCreator<T> {
  const refCreator = ((element: React.ReactNode): void => {
    refCreator.value = element as T;
  }) as RefCreator<T>;
  refCreator.value = null;

  return refCreator;
}