/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { OptionState, OptionSlots } from './Option.types';

/**
 * Render the final JSX of Option
 */
export const renderOption_unstable = (state: OptionState) => {
  const { slots, slotProps } = getSlotsNext<OptionSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.checkIcon && <slots.checkIcon {...slotProps.checkIcon} />}
      {slotProps.root.children}
    </slots.root>
  );
};
