import type * as React from 'react';

type ReactKeyboardEventAdapter = {
  event: React.KeyboardEvent<HTMLElement>;
  release: () => void;
};

/**
 * Creates a React-compatible keyboard event wrapper for native Tabster-driven keyboard interactions.
 * Mirrors the subset of React's synthetic event contract that our selection callbacks rely on.
 * @internal
 */
export function createReactKeyboardEvent(
  nativeEvent: KeyboardEvent,
  currentTarget: HTMLElement,
): ReactKeyboardEventAdapter {
  let propagationStopped = false;

  const event = {
    nativeEvent,
    target: nativeEvent.target,
    currentTarget,
    bubbles: nativeEvent.bubbles,
    cancelable: nativeEvent.cancelable,
    get defaultPrevented() {
      return nativeEvent.defaultPrevented;
    },
    eventPhase: nativeEvent.eventPhase,
    isTrusted: nativeEvent.isTrusted,
    preventDefault: () => nativeEvent.preventDefault(),
    isDefaultPrevented: () => nativeEvent.defaultPrevented,
    stopPropagation: () => {
      propagationStopped = true;
      nativeEvent.stopPropagation();
    },
    isPropagationStopped: () => propagationStopped,
    persist: () => undefined,
    timeStamp: nativeEvent.timeStamp,
    type: nativeEvent.type,
    key: nativeEvent.key,
    code: nativeEvent.code,
    charCode: 0,
    // React exposes these legacy keydown fields even when native `which` differs.
    /* eslint-disable @typescript-eslint/no-deprecated */
    keyCode: nativeEvent.keyCode,
    which: nativeEvent.keyCode,
    /* eslint-enable @typescript-eslint/no-deprecated */
    location: nativeEvent.location,
    ctrlKey: nativeEvent.ctrlKey,
    shiftKey: nativeEvent.shiftKey,
    altKey: nativeEvent.altKey,
    metaKey: nativeEvent.metaKey,
    repeat: nativeEvent.repeat,
    getModifierState: (key: string) => nativeEvent.getModifierState(key),
    view: nativeEvent.view,
    detail: nativeEvent.detail,
  } as unknown as React.KeyboardEvent<HTMLElement>;

  return {
    event,
    release: () => {
      Object.defineProperty(event, 'currentTarget', { value: null });
    },
  };
}
