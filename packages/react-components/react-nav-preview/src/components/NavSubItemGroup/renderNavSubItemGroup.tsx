/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavSubItemGroupState, NavSubItemGroupSlots } from './NavSubItemGroup.types';

/**
 * Render the final JSX of NavSubItemGroup
 */
export const renderNavSubItemGroup_unstable = (state: NavSubItemGroupState) => {
  assertSlots<NavSubItemGroupSlots>(state);

  return state.open ? <state.root>{state.root.children}</state.root> : null;
};
