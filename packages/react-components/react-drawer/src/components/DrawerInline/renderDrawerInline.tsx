import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerInlineState, DrawerInlineSlots } from './DrawerInline.types';

/**
 * Render the final JSX of DrawerInline
 */
export const renderDrawerInline_unstable = (state: DrawerInlineState) => {
  const { slots, slotProps } = getSlots<DrawerInlineSlots>(state);

  if (!state.open) {
    return null;
  }

  return <slots.root {...slotProps.root} />;
};
