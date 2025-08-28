/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { NavSubItemState, NavSubItemSlots } from './NavSubItem.types';

/**
 * Render the final JSX of NavSubItem
 */
export const renderNavSubItem_unstable = (state: NavSubItemState): JSXElement => {
  assertSlots<NavSubItemSlots>(state);

  return <state.root />;
};
