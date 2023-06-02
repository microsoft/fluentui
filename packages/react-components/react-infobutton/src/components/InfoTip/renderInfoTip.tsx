/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { InfoTipState, InfoTipSlots } from './InfoTip.types';

/**
 * Render the final JSX of InfoTip
 */
export const renderInfoTip_unstable = (state: InfoTipState) => {
  const { slots, slotProps } = getSlotsNext<InfoTipSlots>(state);

  return (
    <slots.tooltip {...slotProps.tooltip}>
      <slots.root {...slotProps.root} />
    </slots.tooltip>
  );
};
