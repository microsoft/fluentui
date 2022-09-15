import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableBodyState, TableBodySlots } from './TableBody.types';

/**
 * Render the final JSX of TableBody
 */
export const renderTableBody_unstable = (state: TableBodyState) => {
  const { slots, slotProps } = getSlots<TableBodySlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
