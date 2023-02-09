import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { BreadcrumbProvider } from './BreadcrumbContext';
import type { BreadcrumbState, BreadcrumbSlots, BreadcrumbContextValue } from './Breadcrumb.types';
/**
 * Render the final JSX of Breadcrumb
 */
export const renderBreadcrumb_unstable = (state: BreadcrumbState, breadcrumbContextValue: BreadcrumbContextValue) => {
  const { slots, slotProps } = getSlots<BreadcrumbSlots>(state);
  const { root, list } = slotProps;
  return (
    <slots.root {...root}>
      <BreadcrumbProvider value={breadcrumbContextValue}>
        {slots.list && <slots.list {...list}>{root.children}</slots.list>}
      </BreadcrumbProvider>
    </slots.root>
  );
};
