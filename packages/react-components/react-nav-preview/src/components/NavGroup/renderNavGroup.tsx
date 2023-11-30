/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { NavGroupState, NavGroupInternalSlots } from './NavGroup.types';

/**
 * Render the final JSX of navGroup
 */
export const renderNavGroup_unstable = (state: NavGroupState) => {
  assertSlots<NavGroupInternalSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      <state.content />
      {state.contentReservedSpace && <state.contentReservedSpace />}
    </state.root>
  );
};
