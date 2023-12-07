/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { NavGroupState, NavGroupSlots } from './NavGroup.types';

/**
 * Render the final JSX of navGroup
 */
export const renderNavGroup_unstable = (state: NavGroupState) => {
  assertSlots<NavGroupSlots>(state);

  return (
    <state.root>
      {/* TODO: light this up when we have design spec */}
      {/* {state.icon && <state.icon />} */}
      <state.content />
    </state.root>
  );
};
