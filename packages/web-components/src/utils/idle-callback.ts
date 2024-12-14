/**
 * A {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback | `requestIdleCallback()`} workalike that uses `setTimeout`.
 *
 * @param cb - The callback to run when the browser is idle.
 * @param _options - The options for the idle callback.
 * @returns The idle callback handle.
 *
 * @internal
 */
export const fakeRequestIdleCallback = (cb: () => void, _options?: { timeout: number }) =>
  setTimeout(cb, _options?.timeout ?? 1);

/**
 * Ponyfill for {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback | `requestIdleCallback()`}.
 *
 * @param cb - The callback to run when the browser is idle.
 * @returns The idle callback handle.
 *
 * @internal
 */
export const requestIdleCallback = window.requestIdleCallback || fakeRequestIdleCallback;

/**
 * Ponyfill for {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback | `cancelIdleCallback()`}.
 *
 * @param handle - The idle callback handle to cancel.
 *
 * @internal
 */
export const cancelIdleCallback = window.cancelIdleCallback || clearTimeout;
