/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { BreadcrumbItemState, BreadcrumbItemSlots } from './BreadcrumbItem.types';

/**
 * Render the final JSX of BreadcrumbItem
 */
export const renderBreadcrumbItem_unstable = (state: BreadcrumbItemState) => {
  const { slots, slotProps } = getSlotsNext<BreadcrumbItemSlots>(state);

  return <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>;
};
