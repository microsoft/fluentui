import * as React from 'react';
import { getCode, EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { ButtonState } from './Button.types';

/**
 * The useButton hook processes the Button draft state.
 * @param draftState - Button draft state to mutate.
 */
export const useButtonState = (draftState: ButtonState) => {
  if (draftState.as !== 'button') {
    draftState.role = 'button';

    if (draftState.as !== 'a') {
      const { onClick: onClickCallback, onKeyDown: onKeyDownCallback } = draftState;

      draftState.tabIndex = 0;

      draftState.onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
        if (onKeyDownCallback) {
          onKeyDownCallback(ev);
        }

        const keyCode = getCode(ev);
        if (!ev.defaultPrevented && onClickCallback && (keyCode === EnterKey || keyCode === SpacebarKey)) {
          // Translate the keydown enter/space to a click.
          ev.preventDefault();
          ev.stopPropagation();

          (ev.target as HTMLElement).click();
        }
      };
    }
  }

  // Disallow click and keyboard events when component is disabled and eat events when disabledFocusable is set to true.
  const { disabled, disabledFocusable, onKeyDown } = draftState;
  if (disabled) {
    draftState.onClick = undefined;
  }
  draftState.onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    const keyCode = getCode(ev);
    if (disabled && (keyCode === EnterKey || keyCode === SpacebarKey)) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onKeyDown?.(ev);
    }
  };

  draftState['aria-disabled'] = disabled || disabledFocusable;
  draftState.disabled = draftState.as === 'button' ? disabled && !disabledFocusable : undefined;
};
