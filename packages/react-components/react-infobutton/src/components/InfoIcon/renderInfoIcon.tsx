/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { InfoIconState, InfoIconSlots } from './InfoIcon.types';

/**
 * Render the final JSX of InfoIcon
 */
export const renderInfoIcon_unstable = (state: InfoIconState) => {
  const { slots, slotProps } = getSlotsNext<InfoIconSlots>(state);

  return (
    <slots.tooltip {...slotProps.tooltip}>
      <slots.root {...slotProps.root} />
    </slots.tooltip>
  );
};
