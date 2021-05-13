import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
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
    <>
      {state.children}
      {state.shouldRenderTooltip && (
        <Portal>
          <slots.root {...slotProps.root}>
            {!state.noArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
            <slots.content {...slotProps.content} />
          </slots.root>
        </Portal>
      )}
    </>
  );
};
