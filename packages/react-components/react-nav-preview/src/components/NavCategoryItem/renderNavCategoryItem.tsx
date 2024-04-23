/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { NavCategoryItemState, NavCategoryItemSlots, NavCategoryItemContextValues } from './NavCategoryItem.types';
import { NavCategoryItemProvider } from '../NavCategoryItemContext';

/**
 * Render the final JSX of NavCategoryItem
 */
export const renderNavCategoryItem_unstable = (
  state: NavCategoryItemState,
  contextValues: NavCategoryItemContextValues,
) => {
  assertSlots<NavCategoryItemSlots>(state);

  return (
    <NavCategoryItemProvider value={contextValues.navCategoryItem}>
      <state.root>
        {state.icon && <state.icon />}
        {state.root.children}
        {state.expandIcon && <state.expandIcon />}
      </state.root>
    </NavCategoryItemProvider>
  );
};
