import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { tooltipShorthandProps } from './useTooltip';
import type { TooltipState } from './Tooltip.types';

/**
 * Render the final JSX of Tooltip
 */
export const renderTooltip = (state: TooltipState) => {
  const { slots, slotProps } = getSlotsCompat(state, tooltipShorthandProps);

  return (
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <Portal>
          <slots.root {...slotProps.root}>
            {state.withArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
            <slots.content {...slotProps.content} />
          </slots.root>
        </Portal>
      )}
    </>
  );
};
