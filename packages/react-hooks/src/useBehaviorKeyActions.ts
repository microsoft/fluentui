import * as React from 'react';
import { KeyActions } from '@fluentui/accessibility';
import { getCode } from '@fluentui/keyboard-key';

export const useBehaviorKeyActions = <TElement>(
  keyActions?: KeyActions,
  eventHandlers?: React.DOMAttributes<TElement>,
): React.DOMAttributes<TElement> => {
  const { onClick, onKeyDown } = eventHandlers || {};

  let _onKeyDown = onKeyDown;

  const keyCombinations = keyActions?.root?.performClick?.keyCombinations;
  if (keyCombinations) {
    _onKeyDown = (ev: React.KeyboardEvent<TElement>) => {
      if (onKeyDown) {
        onKeyDown(ev);
      }

      if (onClick) {
        const eventCode = getCode(ev);
        for (const keyCombination of keyCombinations) {
          if (eventCode === keyCombination.keyCode) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick(ev as any);
          }
        }
      }
    };
  }

  return { onKeyDown: _onKeyDown };
};
