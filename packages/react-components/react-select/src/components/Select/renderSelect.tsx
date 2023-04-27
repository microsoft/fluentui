/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { SelectSlots, SelectState } from './Select.types';

/**
 * Render the final JSX of Select
 */
export const renderSelect_unstable = (state: SelectState) => {
  const { slots, slotProps } = getSlotsNext<SelectSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      <slots.select {...slotProps.select}>{slotProps.select.children}</slots.select>
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};
