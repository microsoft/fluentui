import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { BreadcrumbState, BreadcrumbSlots } from './Breadcrumb.types';
/**
 * Render the final JSX of Breadcrumb
 */
export const renderBreadcrumb_unstable = (state: BreadcrumbState) => {
  const { slots, slotProps } = getSlots<BreadcrumbSlots>(state);
  const { root, list } = slotProps;
  return <slots.root {...root}>{slots.list && <slots.list {...list}>{root.children}</slots.list>}</slots.root>;
};
