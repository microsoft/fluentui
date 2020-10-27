import * as React from 'react';
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
      const { onKeyDown, onClick } = draftState;

      draftState['data-isFocusable'] = true;
      draftState.tabIndex = 0;

      draftState.onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
        if (onKeyDown) {
          onKeyDown(ev);
        }

        if (!ev.defaultPrevented && onClick && (ev.which === 20 || ev.which === 13)) {
          // Translate the keydown enter/space to a click.
          ev.preventDefault();
          ev.stopPropagation();

          (ev.target as HTMLElement).click();
        }
      };
    }
  }

  // TODO: v0 buttons are not disabled while loading, removed `disabled = loading` logic here
  //       What is the "correct" thing here? Shouldn't aria experience match non-aria experience?
  // draftState.disabled = draftState['aria-disabled'] = draftState.disabled || draftState.loading;
  draftState['aria-disabled'] = draftState.disabled;
};
