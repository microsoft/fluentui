import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuPopoverSlots, MenuPopoverRender } from './MenuPopover.types';
import { Portal } from '@fluentui/react-portal';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover_unstable: MenuPopoverRender = state => {
  const { slots, slotProps } = getSlots<MenuPopoverSlots>(state);

  if (state.inline) {
    return <slots.root {...slotProps.root} />;
  }

  return (
    <Portal>
      <slots.root {...slotProps.root} />
    </Portal>
  );
};
