import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import { TooltipTriggerState } from './TooltipTrigger.types';
import { tooltipTriggerShorthandProps } from './useTooltipTrigger';

/**
 * Render the final JSX of TooltipTrigger
 * {@docCategory TooltipTrigger}
 */
export const renderTooltipTrigger = (state: TooltipTriggerState) => {
  const { slots, slotProps } = getSlots(state, tooltipTriggerShorthandProps);

  return (
    <>
      {state.children}
      <Portal>
        <slots.tooltip {...slotProps.tooltip} />
      </Portal>
    </>
  );
};
