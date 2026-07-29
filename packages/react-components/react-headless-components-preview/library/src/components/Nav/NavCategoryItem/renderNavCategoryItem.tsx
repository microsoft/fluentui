/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { NavCategoryItemProvider } from '@fluentui/react-nav';
import type { NavCategoryItemState, NavCategoryItemSlots, NavCategoryItemContextValues } from './NavCategoryItem.types';

/**
 * Render the final JSX of NavCategoryItem
 */
export const renderNavCategoryItem = (
  state: NavCategoryItemState,
  contextValues: NavCategoryItemContextValues,
): JSXElement => {
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
