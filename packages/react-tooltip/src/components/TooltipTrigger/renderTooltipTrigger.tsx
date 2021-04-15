import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getSlots, isSSR } from '@fluentui/react-utilities';
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
      {isSSR() || state.tooltipContainer === undefined
        ? null
        : ReactDOM.createPortal(<slots.tooltip {...slotProps.tooltip} />, state.tooltipContainer)}
    </>
  );
};
