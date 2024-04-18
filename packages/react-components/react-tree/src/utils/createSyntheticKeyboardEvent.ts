import * as React from 'react';
import { ArrowUp, ArrowDown } from '@fluentui/keyboard-keys';

/**
 * Tree navigation request is coupled to events. We can't remove the dependency on event since it would be a breaking
 * change. So this utility creates a shim of a React keyboard event
 * @param key - The keyboard key
 * @param target - HTMLElement used as target
 * @returns - shim of a React.KeyboardEvent
 */
export const createSyntheticKeyboardEvent = <TElement extends HTMLElement = HTMLDivElement>(
  key: typeof ArrowDown | typeof ArrowUp,
  target: TElement,
): React.KeyboardEvent<TElement> => {
  return {
    altKey: false,
    bubbles: true,
    cancelable: true,
    ctrlKey: false,
    currentTarget: target,
    defaultPrevented: false,
    code: '-1',
    detail: -1,
    eventPhase: -1,
    isDefaultPrevented: () => false,
    isPropagationStopped: () => false,
    isTrusted: false,
    key,
    locale: 'en',
    nativeEvent: new KeyboardEvent('keydown', { key }),
    shiftKey: false,
    metaKey: false,
    location: -1,
    repeat: false,
    target,
    type: 'keydown',
    view: null as unknown as React.AbstractView,
    timeStamp: -1,
    stopPropagation: () => null,
    persist: () => null,
    preventDefault: () => null,
    getModifierState: () => false,
    charCode: -1,
    keyCode: -1,
    which: -1,
  };
};
