/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { BreadcrumbLinkState, BreadcrumbLinkSlots } from './BreadcrumbLink.types';

/**
 * Render the final JSX of BreadcrumbLink
 */
export const renderBreadcrumbLink_unstable = (state: BreadcrumbLinkState) => {
  const { slots, slotProps } = getSlotsNext<BreadcrumbLinkSlots>(state);
  const { iconOnly, iconPosition } = state;
  return (
    <slots.root {...slotProps.root}>
      {iconPosition !== 'after' && slots.icon && <slots.icon {...slotProps.icon} />}
      {!iconOnly && state.root.children}
      {iconPosition === 'after' && slots.icon && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
