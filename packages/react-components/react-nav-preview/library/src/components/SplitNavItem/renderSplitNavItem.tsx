/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { SplitNavItemState, SplitNavItemSlots } from './SplitNavItem.types';

/**
 * Render the final JSX of SplitNavItem
 */
export const renderSplitNavItem_unstable = (state: SplitNavItemState) => {
  assertSlots<SplitNavItemSlots>(state);

  return (
    <state.root>
      {state.primaryNavItem && <state.primaryNavItem />}
      {state.secondaryActionButton && <state.secondaryActionButton />}
      {state.secondaryToggleButton && <state.secondaryToggleButton />}
      {state.menuButton && <state.menuButton />}
    </state.root>
  );
};
