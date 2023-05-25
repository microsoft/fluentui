/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TableResizeHandleState, TableResizeHandleSlots } from './TableResizeHandle.types';

/**
 * Render the final JSX of TableResizeHandle
 */
export const renderTableResizeHandle_unstable = (state: TableResizeHandleState) => {
  const { slots, slotProps } = getSlotsNext<TableResizeHandleSlots>(state);
  return <slots.root {...slotProps.root} />;
};
