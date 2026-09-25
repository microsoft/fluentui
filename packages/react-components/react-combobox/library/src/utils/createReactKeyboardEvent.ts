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
  let callbackCurrentTarget: HTMLElement | null = currentTarget;
  let propagationStopped = false;

  const event = {
    nativeEvent,
    target: nativeEvent.target,
    currentTarget: callbackCurrentTarget,
    bubbles: nativeEvent.bubbles,
    cancelable: nativeEvent.cancelable,
    defaultPrevented: nativeEvent.defaultPrevented,
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
    location: nativeEvent.location,
    ctrlKey: nativeEvent.ctrlKey,
    shiftKey: nativeEvent.shiftKey,
    altKey: nativeEvent.altKey,
    metaKey: nativeEvent.metaKey,
    repeat: nativeEvent.repeat,
    getModifierState: (key: string) => nativeEvent.getModifierState(key),
    view: nativeEvent.view,
    detail: nativeEvent.detail,
    which: nativeEvent.which,
    charCode: nativeEvent.charCode,
    keyCode: nativeEvent.keyCode,
    sourceCapabilities: (nativeEvent as any).sourceCapabilities,
  } as unknown as React.KeyboardEvent<HTMLElement>;

  return {
    event,
    release: () => {
      callbackCurrentTarget = null;
      (event as any).currentTarget = null;
    },
  };
}
