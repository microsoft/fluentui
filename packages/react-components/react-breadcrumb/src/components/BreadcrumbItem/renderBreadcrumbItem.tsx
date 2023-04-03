import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { BreadcrumbItemState, BreadcrumbItemSlots } from './BreadcrumbItem.types';

/**
 * Render the final JSX of BreadcrumbItem
 */
export const renderBreadcrumbItem_unstable = (state: BreadcrumbItemState) => {
  const { slots, slotProps } = getSlots<BreadcrumbItemSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>;
};
