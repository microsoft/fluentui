import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { OptionGroupState, OptionGroupSlots } from './OptionGroup.types';

/**
 * Render the final JSX of OptionGroup
 */
export const renderOptionGroup_unstable = (state: OptionGroupState) => {
  const { slots, slotProps } = getSlots<OptionGroupSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.label && <slots.label {...slotProps.label}>{slotProps.label.children}</slots.label>}
      {slotProps.root.children}
    </slots.root>
  );
};
