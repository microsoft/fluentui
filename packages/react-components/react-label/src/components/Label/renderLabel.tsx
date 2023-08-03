/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { LabelState, LabelSlots } from './Label.types';

/**
 * Render the final JSX of Label
 */
export const renderLabel_unstable = (state: LabelState) => {
  const { slots, slotProps } = getSlotsNext<LabelSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.root.children}
      {slots.required && <slots.required {...slotProps.required} />}
    </slots.root>
  );
};
