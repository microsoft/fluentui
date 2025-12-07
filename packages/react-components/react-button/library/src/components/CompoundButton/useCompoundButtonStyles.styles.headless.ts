'use client';

import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';

// Re-export the same slot class names mapping used by the griffel styles file
export const compoundButtonClassNames: SlotClassNames<CompoundButtonSlots> = {
  root: 'fui-CompoundButton',
  icon: 'fui-CompoundButton__icon',
  contentContainer: 'fui-CompoundButton__contentContainer',
  secondaryContent: 'fui-CompoundButton__secondaryContent',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  'use no memo';

  state.root.className = getComponentSlotClassName(compoundButtonClassNames.root, state.root, state);

  if (state.icon) {
    state.icon.className = getComponentSlotClassName(compoundButtonClassNames.icon, state.icon);
  }

  state.contentContainer.className = getComponentSlotClassName(
    compoundButtonClassNames.contentContainer,
    state.contentContainer,
  );

  if (state.secondaryContent) {
    state.secondaryContent.className = getComponentSlotClassName(
      compoundButtonClassNames.secondaryContent,
      state.secondaryContent,
    );
  }

  return state;
};
