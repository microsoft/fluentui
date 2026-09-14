/**
 * Microtask debouncer: coalesces multiple synchronous calls within a task into
 * a single invocation, fired before the next paint. Same shape as the helper
 * `@fluentui/react-positioning` uses internally (originally from Popper.js v2).
 */
export function debounce(fn: () => void): () => void {
  let pending = false;
  return () => {
    if (pending) {
      return;
    }
    pending = true;
    Promise.resolve().then(() => {
      pending = false;
      fn();
    });
  };
}
