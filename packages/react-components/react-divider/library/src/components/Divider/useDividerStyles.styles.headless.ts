'use client';

import { DividerSlots, DividerState } from './Divider.types';
import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';

export const dividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-Divider',
  wrapper: 'fui-Divider__wrapper',
};

/**
 * Attaches only semantic slot class names and state modifiers
 */
export const useDividerStyles_unstable = (state: DividerState): DividerState => {
  'use no memo';

  state.root.className = getComponentSlotClassName(dividerClassNames.root, state.root, state);

  if (state.wrapper) {
    state.wrapper.className = getComponentSlotClassName(dividerClassNames.wrapper, state.wrapper);
  }

  return state;
};
