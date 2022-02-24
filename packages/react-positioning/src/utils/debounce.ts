export default function debounce<T, TArgs extends unknown[]>(
  fn: (...args: TArgs) => Promise<T>,
): (...args: TArgs) => Promise<T> {
  let pending: Promise<T> | undefined;
  return (...args) => {
    if (!pending) {
      pending = new Promise<T>(resolve => {
        Promise.resolve().then(() => {
          pending = undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resolve(fn(...(args as any)));
        });
      });
    }

    return pending;
  };
}
