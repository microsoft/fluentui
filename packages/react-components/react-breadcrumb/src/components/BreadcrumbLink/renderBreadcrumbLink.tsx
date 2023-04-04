import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { BreadcrumbLinkState, BreadcrumbLinkSlots } from './BreadcrumbLink.types';

/**
 * Render the final JSX of BreadcrumbLink
 */
export const renderBreadcrumbLink_unstable = (state: BreadcrumbLinkState) => {
  const { slots, slotProps } = getSlots<BreadcrumbLinkSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
