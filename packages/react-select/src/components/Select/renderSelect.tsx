import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SelectSlots, SelectState } from './Select.types';

/**
 * Render the final JSX of Select
 */
export const renderSelect_unstable = (state: SelectState) => {
  const { slots, slotProps } = getSlots<SelectSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      <slots.select {...slotProps.select}>{slotProps.select.children}</slots.select>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};
