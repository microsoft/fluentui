/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { OptionGroupState, OptionGroupSlots } from './OptionGroup.types';

/**
 * Render the final JSX of OptionGroup
 */
export const renderOptionGroup_unstable = (state: OptionGroupState) => {
  const { slots, slotProps } = getSlotsNext<OptionGroupSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.label && <slots.label {...slotProps.label}>{slotProps.label.children}</slots.label>}
      {slotProps.root.children}
    </slots.root>
  );
};
