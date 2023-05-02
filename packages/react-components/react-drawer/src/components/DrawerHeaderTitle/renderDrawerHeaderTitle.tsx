import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleState, DrawerHeaderTitleSlots } from './DrawerHeaderTitle.types';
import { DialogTitle, DialogTitleProps } from '@fluentui/react-dialog';

/**
 * Render the final JSX of DrawerHeaderTitle
 */
export const renderDrawerHeaderTitle_unstable = (state: DrawerHeaderTitleState) => {
  const { slots, slotProps } = getSlots<DrawerHeaderTitleSlots>(state);

  const titleProps = {
    ...state.title,
    action: slotProps.action,
  } as DialogTitleProps;

  return (
    <slots.root {...slotProps.root}>
      <DialogTitle {...titleProps} />
    </slots.root>
  );
};
