/**
 * A ponyfill for requestIdleCallback that falls back to setTimeout.
 * Uses the native requestIdleCallback when available.
 *
 * @param callback - The function to call when the browser is idle.
 * @param options - Options object that may contain a timeout property.
 * @returns An ID that can be used to cancel the callback.
 * @public
 */
export function requestIdleCallback(
  callback: (args: { didTimeout: boolean }) => void,
  options?: { timeout: number },
): ReturnType<typeof globalThis.requestIdleCallback | typeof setTimeout> {
  if ('requestIdleCallback' in globalThis) {
    return globalThis.requestIdleCallback(callback, options);
  }

  const start = Date.now();
  return setTimeout(() => {
    callback({
      didTimeout: options?.timeout ? Date.now() - start >= options.timeout : false,
    });
  }, 1);
}

/**
 * A ponyfill for cancelIdleCallback that falls back to clearTimeout.
 * Uses the native cancelIdleCallback when available.
 *
 * @param id - The ID of the callback to cancel.
 * @public
 */
export function cancelIdleCallback(id: ReturnType<typeof globalThis.requestIdleCallback | typeof setTimeout>): void {
  if ('cancelIdleCallback' in globalThis) {
    (globalThis as unknown as Window).cancelIdleCallback(id as number);
  } else {
    clearTimeout(id);
  }
}

/**
 * Waits for all custom element descendants of a target element to be connected.
 *
 * @param target - The target element to observe.
 * @param callback - The function to call when all custom element descendants are connected.
 * @param options - Options object that may contain a timeout property for the idle callback.
 *
 * @remarks
 * This function uses requestIdleCallback to periodically check if all custom element
 * descendants (elements with a hyphen in their tag name) are connected to the DOM.
 * Once all such elements are connected, the provided callback is invoked.
 *
 * The `timeout` option specifies the maximum time to wait for each idle callback before
 * rechecking, defaulting to 50 milliseconds.
 *
 * @public
 */
export function waitForConnectedDescendants(
  target: HTMLElement,
  callback: () => void,
  options = { shallow: false, timeout: 50 },
): void {
  let idleCallbackId: ReturnType<typeof requestIdleCallback> | void;
  const query = options.shallow ? ':scope > *' : '*';

  if (!target.isConnected) {
    return;
  }

  const scheduleCheck = () => {
    if (idleCallbackId) {
      idleCallbackId = cancelIdleCallback(idleCallbackId);
    }

    if (
      Array.from(target.querySelectorAll(query))
        .filter(el => el.tagName.includes('-'))
        .every(el => el.isConnected)
    ) {
      callback();
      return;
    }

    idleCallbackId = requestIdleCallback(scheduleCheck, { timeout: options.timeout });
  };

  scheduleCheck();
}
