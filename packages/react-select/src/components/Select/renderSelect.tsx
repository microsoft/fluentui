import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { selectShorthandProps } from './useSelect';
import type { SelectSlots, SelectState } from './Select.types';

/**
 * Render the final JSX of Select
 */
export const renderSelect = (state: SelectState) => {
  const { slots, slotProps } = getSlots<SelectSlots>(state, selectShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      <slots.select {...slotProps.select}>{slotProps.select.children}</slots.select>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};
