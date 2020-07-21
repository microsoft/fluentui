import * as React from 'react';
import { KeyActions, KeyCombinations } from '@fluentui/accessibility';
import { BaseSlots } from '@fluentui/react-compose';
import { getCode } from '@fluentui/keyboard-key';

type SlotEventsMap<TSlots, TElement> = Record<keyof TSlots, React.DOMAttributes<TElement>>;
type BehaviorKeyActions<TSlots, TElement> = SlotEventsMap<TSlots, TElement> & React.DOMAttributes<TElement>;

const getClickOnKeyCombinations = <TElement>(
  keyCombinations: KeyCombinations[],
  eventHandlers: React.DOMAttributes<TElement>,
) => {
  const { onClick, onKeyDown } = eventHandlers;

  return (ev: React.KeyboardEvent<TElement>) => {
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
};

export const useBehaviorKeyActions = <TSlots extends BaseSlots, TElement>(
  keyActions?: KeyActions,
  slotEvents?: SlotEventsMap<TSlots, TElement>,
): BehaviorKeyActions<Omit<TSlots, 'root'>, TElement> => {
  const behaviorKeyActions = {} as BehaviorKeyActions<Omit<TSlots, 'root'>, TElement>;

  if (keyActions && slotEvents) {
    for (const slot of Object.keys(keyActions)) {
      const performClick = keyActions[slot].performClick;
      const slotEventHandlers = slotEvents[slot as keyof TSlots];

      // For every slot check if there is a performClick directive and an associated onClick event.
      if (performClick && slotEventHandlers && slotEventHandlers.onClick) {
        const clickOnKeyCombinations = getClickOnKeyCombinations<TElement>(
          performClick.keyCombinations,
          slotEventHandlers,
        );

        // If the slot is root add at the top layer, else add to that slot.
        if (slot === 'root') {
          behaviorKeyActions.onKeyDown = clickOnKeyCombinations;
        } else {
          behaviorKeyActions[slot as keyof Omit<TSlots, 'root'>].onKeyDown = clickOnKeyCombinations;
        }
      }
    }
  }

  return behaviorKeyActions;
};
