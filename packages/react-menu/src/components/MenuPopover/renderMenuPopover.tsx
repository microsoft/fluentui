import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
<<<<<<< HEAD
=======
import { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
>>>>>>> Updates react-menu to use root as slot
import { Portal } from '@fluentui/react-portal';
import type { MenuPopoverState } from './MenuPopover.types';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover = (state: MenuPopoverState) => {
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
