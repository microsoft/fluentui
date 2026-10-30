type Listener<Value> = (payload: Value) => void;

type RemovalState = {
  /** Every index before `start` holds a placeholder. */
  start: number;
  /** Index after the most recently removed listener. */
  cursor: number;
  /** Number of placeholders in the array. */
  placeholders: number;
};

const removalStates = new WeakMap<unknown[], RemovalState>();

/**
 * Takes the slot of a removed listener, so removing a listener does not shift all listeners after it.
 */
const removedListenerPlaceholder = (): void => {
  // noop
};

function compactListeners<Value>(listeners: Listener<Value>[], state: RemovalState): void {
  let writeIndex = 0;

  for (let readIndex = 0; readIndex < listeners.length; readIndex++) {
    if (listeners[readIndex] !== removedListenerPlaceholder) {
      listeners[writeIndex++] = listeners[readIndex];
    }
  }

  listeners.length = writeIndex;
  state.start = 0;
  state.cursor = 0;
  state.placeholders = 0;
}

function findListener<Value>(
  listeners: Listener<Value>[],
  listener: Listener<Value>,
  state: RemovalState | undefined,
): number {
  if (!state) {
    return listeners.indexOf(listener);
  }

  // Consumers are commonly unmounted in the order they subscribed, so the listener to remove is often the one after
  // the previously removed listener or the first one after the leading placeholders.
  if (listeners[state.cursor] === listener) {
    return state.cursor;
  }

  const index = listeners.indexOf(listener, state.start);

  if (index === -1 && state.start > 0) {
    // The array was modified outside of this helper: search all of it and stop relying on the start position
    state.start = 0;
    return listeners.indexOf(listener);
  }

  return index;
}

/**
 * Removes a listener while preserving the order of the remaining listeners.
 *
 * `indexOf()` + `splice()` shifts every listener after the removed one, so unmounting N consumers of the same context
 * was O(N^2). Instead, the removed listener is replaced with a no-op placeholder and placeholders are compacted once
 * they make up half of the array.
 *
 * @internal
 */
export function removeListener<Value>(listeners: Listener<Value>[], listener: Listener<Value>): void {
  let state = removalStates.get(listeners);

  if (listeners.length > 0 && listeners[listeners.length - 1] === listener) {
    listeners.pop();
  } else {
    const index = findListener(listeners, listener, state);

    if (index === -1) {
      return;
    }

    if (!state) {
      state = { start: 0, cursor: 0, placeholders: 0 };
      removalStates.set(listeners, state);
    }

    listeners[index] = removedListenerPlaceholder;
    state.placeholders++;
    state.cursor = index + 1;
  }

  if (!state) {
    return;
  }

  while (listeners.length > 0 && listeners[listeners.length - 1] === removedListenerPlaceholder) {
    listeners.pop();
    state.placeholders--;
  }

  state.start = Math.min(state.start, listeners.length);
  state.cursor = Math.min(state.cursor, listeners.length);

  while (state.start < listeners.length && listeners[state.start] === removedListenerPlaceholder) {
    state.start++;
  }

  if (state.placeholders > 0 && state.placeholders * 2 >= listeners.length) {
    compactListeners(listeners, state);
  }
}
