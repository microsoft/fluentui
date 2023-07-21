/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TabState, TabSlots } from './Tab.types';

/**
 * Render the final JSX of Tab
 */
export const renderTab_unstable = (state: TabState) => {
  const { slots, slotProps } = getSlotsNext<TabSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {!state.iconOnly && <slots.content {...slotProps.content} />}
      {!state.selected && !state.iconOnly && state.contentReservedSpaceClassName !== undefined && (
        <slots.content {...slotProps.content} className={state.contentReservedSpaceClassName} />
      )}
    </slots.root>
  );
};
