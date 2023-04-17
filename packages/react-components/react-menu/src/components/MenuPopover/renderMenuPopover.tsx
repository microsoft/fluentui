/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover_unstable = (state: MenuPopoverState) => {
  const { slots, slotProps } = getSlotsNext<MenuPopoverSlots>(state);

  if (state.inline) {
    return <slots.root {...slotProps.root} />;
  }

  return (
    <Portal mountNode={state.mountNode}>
      <slots.root {...slotProps.root} />
    </Portal>
  );
};
