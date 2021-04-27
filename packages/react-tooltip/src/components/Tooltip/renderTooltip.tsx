import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TooltipState } from './Tooltip.types';
import { tooltipShorthandProps } from './useTooltip';

/**
 * Render the final JSX of Tooltip
 * {@docCategory Tooltip}
 */
export const renderTooltip = (state: TooltipState) => {
  const { slots, slotProps } = getSlots(state, tooltipShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.arrow {...slotProps.arrow} />
      {state.children}
    </slots.root>
  );
};
