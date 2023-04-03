import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { BreadcrumbButtonState, BreadcrumbButtonSlots } from './BreadcrumbButton.types';

/**
 * Render the final JSX of BreadcrumbButton
 */
export const renderBreadcrumbButton_unstable = (state: BreadcrumbButtonState) => {
  const { slots, slotProps } = getSlots<BreadcrumbButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
