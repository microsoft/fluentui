import * as React from 'react';
import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { ButtonState } from './Button.types';

/**
 * The useButton hook processes the Button draft state.
 * @param draftState - Button draft state to mutate.
 */
export const useButtonState = (draftState: ButtonState) => {
  // Update the button's tab-index, keyboard handling, and aria attributes.
  if (draftState.as !== 'button') {
    draftState.role = 'button';

    if (draftState.as !== 'a') {
      const { onKeyDown: onKeyDownCallback, onClick } = draftState;

      draftState['data-isFocusable'] = true;
      draftState.tabIndex = 0;

      draftState.onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
        if (onKeyDownCallback) {
          onKeyDownCallback(ev);
        }

        const keyCode = getCode(ev);
        if (!ev.defaultPrevented && onClick && (keyCode === EnterKey || keyCode === SpacebarKey)) {
          // Translate the keydown enter/space to a click.
          ev.preventDefault();
          ev.stopPropagation();

          (ev.target as HTMLElement).click();
        }
      };
    }
  }

  // Disallow keyboard events when component is disabled and eat events when disabledFocusable is set to true.
  const { disabled, onKeyDown } = draftState;
  draftState.onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    const keyCode = getCode(ev);
    if (disabled && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDown?.(ev);
    }
  };

  draftState['aria-disabled'] = draftState.disabled;
  draftState.disabled =
    draftState.as === 'button' ? draftState['aria-disabled'] && !draftState.disabledFocusable : undefined;
};
