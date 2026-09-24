import type * as React from 'react';

type ReactKeyboardEventAdapter = {
  event: React.KeyboardEvent<HTMLElement>;
  release: () => void;
};

const syntheticProperties = new Set([
  'nativeEvent',
  'currentTarget',
  'isDefaultPrevented',
  'isPropagationStopped',
  'persist',
]);

export function createReactKeyboardEvent(
  nativeEvent: KeyboardEvent,
  currentTarget: HTMLElement,
): ReactKeyboardEventAdapter {
  let callbackCurrentTarget: HTMLElement | null = currentTarget;
  let propagationStopped = false;

  const event = new Proxy(nativeEvent, {
    has(target, property) {
      return syntheticProperties.has(property as string) || Reflect.has(target, property);
    },
    get(target, property) {
      switch (property) {
        case 'nativeEvent':
          return target;
        case 'currentTarget':
          return callbackCurrentTarget;
        case 'isDefaultPrevented':
          return () => target.defaultPrevented;
        case 'isPropagationStopped':
          return () => propagationStopped;
        case 'persist':
          return () => undefined;
        case 'preventDefault':
          return () => target.preventDefault();
        case 'stopPropagation':
          return () => {
            propagationStopped = true;
            target.stopPropagation();
          };
        default: {
          const value = Reflect.get(target, property, target);
          return typeof value === 'function' ? value.bind(target) : value;
        }
      }
    },
  }) as unknown as React.KeyboardEvent<HTMLElement>;

  return {
    event,
    release: () => {
      callbackCurrentTarget = null;
    },
  };
}
