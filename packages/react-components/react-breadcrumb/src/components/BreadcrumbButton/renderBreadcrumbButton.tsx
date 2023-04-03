import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { BreadcrumbButtonState, BreadcrumbButtonSlots } from './BreadcrumbButton.types';

/**
 * Render the final JSX of BreadcrumbButton
 */
export const renderBreadcrumbButton_unstable = (state: BreadcrumbButtonState) => {
  const { slots, slotProps } = getSlots<BreadcrumbButtonSlots>(state);
  const { iconOnly, iconPosition } = state;

  return (
    <slots.root {...slotProps.root}>
      {iconPosition !== 'after' && slots.icon && <slots.icon {...slotProps.icon} />}
      {!iconOnly && state.root.children}
      {iconPosition === 'after' && slots.icon && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
