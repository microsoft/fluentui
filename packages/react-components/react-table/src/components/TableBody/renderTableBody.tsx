/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TableBodyState, TableBodySlots } from './TableBody.types';

/**
 * Render the final JSX of TableBody
 */
export const renderTableBody_unstable = (state: TableBodyState) => {
  const { slots, slotProps } = getSlotsNext<TableBodySlots>(state);

  return <slots.root {...slotProps.root} />;
};
