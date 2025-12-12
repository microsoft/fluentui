'use client';

import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

export const splitButtonClassNames: SlotClassNames<SplitButtonSlots> = {
  root: 'fui-SplitButton',
  menuButton: 'fui-SplitButton__menuButton',
  primaryActionButton: 'fui-SplitButton__primaryActionButton',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useSplitButtonStyles_unstable = (state: SplitButtonState): SplitButtonState => {
  'use no memo';

  state.root.className = getComponentSlotClassName(splitButtonClassNames.root, state.root, state);

  if (state.primaryActionButton) {
    state.primaryActionButton.className = getComponentSlotClassName(
      splitButtonClassNames.primaryActionButton,
      state.primaryActionButton,
    );
  }

  if (state.menuButton) {
    state.menuButton.className = getComponentSlotClassName(splitButtonClassNames.menuButton, state.menuButton);
  }

  return state;
};
