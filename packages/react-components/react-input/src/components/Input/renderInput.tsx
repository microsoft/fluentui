/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { InputSlots, InputState } from './Input.types';

/**
 * Render the final JSX of Input
 */
export const renderInput_unstable = (state: InputState) => {
  const { slots, slotProps } = getSlotsNext<InputSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      {slots.contentBefore && <slots.contentBefore {...slotProps.contentBefore} />}
      <slots.input {...slotProps.input} />
      {slots.contentAfter && <slots.contentAfter {...slotProps.contentAfter} />}
    </slots.root>
  );
};
