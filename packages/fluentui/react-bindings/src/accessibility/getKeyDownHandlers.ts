import { KeyActions, keyboardKey } from '@fluentui/accessibility';
import * as React from 'react';

import { shouldHandleOnKeys } from './shouldHandleOnKeys';
import { AccessibilityActionHandlers, AccessibilityKeyHandlers } from './types';

const rtlKeyMap: Record<number, number> = {
  [keyboardKey.ArrowRight]: keyboardKey.ArrowLeft,
  [keyboardKey.ArrowLeft]: keyboardKey.ArrowRight,
};

/**
 * Assigns onKeyDown handler to the slot element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActionHandlers} componentActionHandlers Actions handlers defined in a component.
 * @param {KeyActions} behaviorActions Mappings of actions and keys defined in Accessibility behavior.
 * @param {boolean} isRtlEnabled Indicates if Left and Right arrow keys should be swapped in RTL mode.
 */
export const getKeyDownHandlers = (
  componentActionHandlers: AccessibilityActionHandlers,
  behaviorActions: KeyActions,
  isRtlEnabled?: boolean,
): AccessibilityKeyHandlers => {
  const slotKeyHandlers: AccessibilityKeyHandlers = {};

  if (!componentActionHandlers || !behaviorActions) {
    return slotKeyHandlers;
  }

  const componentHandlerNames = Object.keys(componentActionHandlers);

  Object.keys(behaviorActions).forEach(slotName => {
    const behaviorSlotActions = behaviorActions[slotName];
    const handledActions = Object.keys(behaviorSlotActions).filter(actionName => {
      const slotAction = behaviorSlotActions[actionName];

      const actionHasKeyCombinations =
        Array.isArray(slotAction.keyCombinations) && slotAction.keyCombinations.length > 0;
      const actionHandledByComponent = componentHandlerNames.indexOf(actionName) !== -1;

      return actionHasKeyCombinations && actionHandledByComponent;
    });

    if (handledActions.length > 0) {
      slotKeyHandlers[slotName] = {
        onKeyDown: (event: React.KeyboardEvent) => {
          handledActions.forEach(actionName => {
            let keyCombinations = behaviorSlotActions[actionName].keyCombinations;

            if (keyCombinations) {
              if (isRtlEnabled) {
                keyCombinations = keyCombinations.map(keyCombination => {
                  const keyToRtlKey = rtlKeyMap[keyCombination.keyCode];
                  if (keyToRtlKey) {
                    keyCombination.keyCode = keyToRtlKey;
                  }
                  return keyCombination;
                });
              }

              if (shouldHandleOnKeys(event, keyCombinations)) {
                componentActionHandlers[actionName](event);
              }
            }
          });
        },
      };
    }
  });

  return slotKeyHandlers;
};
