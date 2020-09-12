import * as React from 'react';
import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { CardState } from './Card.types';

/**
 * The useCard hook processes the Card draft state.
 * @param draftState - Card draft state to mutate.
 */
export const useCardState = (draftState: CardState) => {
  // Update the card's tab-index, keyboard handling, and aria attributes.
  const { disabled, onClick, onKeyDown } = draftState;

  draftState['aria-disabled'] = disabled;
  draftState.role = 'group';
  draftState.tabIndex = !disabled && onClick ? 0 : undefined;

  draftState.onClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) {
      onClick?.(ev);
    }
  };

  draftState.onKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled) {
      onKeyDown?.(ev);

      if (onClick) {
        const eventCode = getCode(ev);
        if (eventCode === EnterKey || eventCode === SpacebarKey) {
          onClick(ev as any);
        }
      }
    }
  };
};
