import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { BreadcrumbDividerState, BreadcrumbDividerSlots } from './BreadcrumbDivider.types';

/**
 * Render the final JSX of BreadcrumbDivider
 */
export const renderBreadcrumbDivider_unstable = (state: BreadcrumbDividerState) => {
  const { slots, slotProps } = getSlots<BreadcrumbDividerSlots>(state);

  return <slots.root {...slotProps.root} />;
};
