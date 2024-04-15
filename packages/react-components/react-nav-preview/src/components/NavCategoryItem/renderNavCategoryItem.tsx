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
        {/* TODO: These were copied from AccordionHeader.
        We need to decide if they are still applicable
        in our scenario and how to adapt them. */}
        {/* <state.button> */}
        {/* Todo: {state.icon && <state.icon />} */}
        {state.root.children}
        {state.expandIcon && <state.expandIcon />} {/* </state.button> */}
      </state.root>
    </NavCategoryItemProvider>
  );
};
