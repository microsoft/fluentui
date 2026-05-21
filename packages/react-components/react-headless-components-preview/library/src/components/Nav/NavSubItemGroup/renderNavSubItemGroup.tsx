/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { NavSubItemGroupState, NavSubItemGroupSlots } from './NavSubItemGroup.types';

/**
 * Render the final JSX of NavSubItemGroup
 *
 * Headless version — renders children only when open, without motion.
 */
export const renderNavSubItemGroup = (state: NavSubItemGroupState): JSXElement | null => {
  assertSlots<NavSubItemGroupSlots>(state);

  if (!state.open) {
    return null;
  }

  return <state.root />;
};
