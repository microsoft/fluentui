import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableResizeHandleState, TableResizeHandleSlots } from './TableResizeHandle.types';

/**
 * Render the final JSX of TableResizeHandle
 */
export const renderTableResizeHandle_unstable = (state: TableResizeHandleState) => {
  const { slots, slotProps } = getSlots<TableResizeHandleSlots>(state);
  return <slots.root {...slotProps.root} />;
};
