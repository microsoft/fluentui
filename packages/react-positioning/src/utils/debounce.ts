export default function debounce<T>(fn: Function): () => Promise<T> {
  let pending: Promise<T> | undefined;
  return () => {
    if (!pending) {
      pending = new Promise<T>(resolve => {
        Promise.resolve().then(() => {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
