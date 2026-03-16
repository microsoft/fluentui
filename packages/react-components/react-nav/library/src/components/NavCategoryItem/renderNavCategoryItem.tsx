/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { NavCategoryItemState, NavCategoryItemSlots, NavCategoryItemContextValues } from './NavCategoryItem.types';
import { NavCategoryItemProvider } from '../NavCategoryItemContext';

const getExpandIcon = (state: NavCategoryItemState) => {
  assertSlots<NavCategoryItemSlots>(state);

  if (!state.expandIcon) {
    return null;
  }

  if (!state.expandIconMotion) {
    return <state.expandIcon />;
  }

  return (
    <state.expandIconMotion>
      <state.expandIcon />
    </state.expandIconMotion>
  );
};

/**
 * Render the final JSX of NavCategoryItem
 */
export const renderNavCategoryItem_unstable = (
  state: NavCategoryItemState,
  contextValues: NavCategoryItemContextValues,
): JSXElement => {
  assertSlots<NavCategoryItemSlots>(state);

  return (
    <NavCategoryItemProvider value={contextValues.navCategoryItem}>
      <state.root>
        {state.icon && <state.icon />}
        {state.root.children}
        {getExpandIcon(state)}
      </state.root>
    </NavCategoryItemProvider>
  );
};
