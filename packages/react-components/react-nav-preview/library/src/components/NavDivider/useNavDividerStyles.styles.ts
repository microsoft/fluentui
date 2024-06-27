import { mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DividerSlots } from '@fluentui/react-divider';
import type { NavDividerState } from './NavDivider.types';

export const navDividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-NavDivider',
  wrapper: 'fui-NavDivider__wrapper',
};

/**
 * Apply styling to the NavDivider slots based on the state
 */
export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  'use no memo';

  state.root.className = mergeClasses(navDividerClassNames.root, state.root.className);
  state.wrapper.className = mergeClasses(navDividerClassNames.wrapper, state.wrapper.className);

  return state;
};
