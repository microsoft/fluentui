/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { Slot, assertSlots } from '@fluentui/react-utilities';
import type { TabState, TabSlots } from './Tab.types';

/**
 * Render the final JSX of Tab
 */
export const renderTab_unstable = (state: TabState) => {
  assertSlots<TabSlots & { contentReservedSpace?: Slot<'span'> }>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {!state.iconOnly && <state.content />}
      {!state.selected && !state.iconOnly && state.contentReservedSpace && <state.contentReservedSpace />}
    </state.root>
  );
};
