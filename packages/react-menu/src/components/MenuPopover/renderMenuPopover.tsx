import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { MenuPopoverState } from './MenuPopover.types';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover = (state: MenuPopoverState) => {
  const { slots, slotProps } = getSlotsCompat(state);

  if (state.inline) {
    return <slots.root {...slotProps.root}>{state.children}</slots.root>;
  }

  return (
    <Portal>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </Portal>
  );
};
