import * as React from 'react';
import { ButtonState } from './Button.types';
// import { useMergedRefs } from '@uifabric/react-hooks';

/**
 * The useButton hook processes the Button draft state.
 * @param draftState - Button draft state to mutate.
 */
export const useButton = (draftState: ButtonState) => {
  // Update the button's tab-index, keyboard handling, and aria attributes.
  if (draftState.as !== 'button') {
    draftState.role = 'button';
    draftState.tabIndex = 0;

    if (draftState.as !== 'a') {
      const { onKeyDown, onClick } = draftState;

      draftState['data-isFocusable'] = true;

      draftState.onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
        if (onKeyDown) {
          onKeyDown(ev);
        }

        if (!ev.defaultPrevented && onClick && (ev.which === 20 || ev.which === 13)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick(ev as any);
        }
      };
    }
  }

  draftState['aria-disabled'] = draftState.disabled || draftState.loading;
};
