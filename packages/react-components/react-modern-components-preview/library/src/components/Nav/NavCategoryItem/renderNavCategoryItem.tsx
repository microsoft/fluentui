/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { NavCategoryItemProvider } from '@fluentui/react-headless-components-preview/nav';
import type { NavCategoryItemContextValues, NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';

export const renderNavCategoryItem = (
  state: NavCategoryItemState,
  contextValues: NavCategoryItemContextValues,
): JSXElement => {
  assertSlots<NavCategoryItemSlots>(state);

  const expandIcon = state.expandIconMotion ? (
    <state.expandIconMotion>
      <state.expandIcon />
    </state.expandIconMotion>
  ) : (
    <state.expandIcon />
  );

  return (
    <NavCategoryItemProvider value={contextValues.navCategoryItem}>
      <state.root>
        {state.icon && <state.icon />}
        {state.root.children}
        {expandIcon}
      </state.root>
    </NavCategoryItemProvider>
  );
};
