/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { NavCategoryItemState, NavCategoryItemSlots } from './NavCategoryItem.types';

/**
 * Render the final JSX of NavCategoryItem
 */
export const renderNavCategoryItem_unstable = (state: NavCategoryItemState) => {
  assertSlots<NavCategoryItemSlots>(state);

  return (
    <state.root>
      {/* TODO: light this up when we have design spec */}
      {/* {state.icon && <state.icon />} */}
      <state.content />
    </state.root>
  );
};
