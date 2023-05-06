/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { BreadcrumbDividerState, BreadcrumbDividerSlots } from './BreadcrumbDivider.types';

/**
 * Render the final JSX of BreadcrumbDivider
 */
export const renderBreadcrumbDivider_unstable = (state: BreadcrumbDividerState) => {
  const { slots, slotProps } = getSlotsNext<BreadcrumbDividerSlots>(state);

  return <slots.root {...slotProps.root} />;
};
