import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableBodyState, TableBodySlots } from './TableBody.types';

/**
 * Render the final JSX of TableBody
 */
export const renderTableBody_unstable = (state: TableBodyState) => {
  const { slots, slotProps } = getSlots<TableBodySlots>(state);

  return <slots.root {...slotProps.root} />;
};
