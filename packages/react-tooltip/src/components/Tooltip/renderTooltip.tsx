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

  const { children, ...restOfContentProps } = slotProps.content;

  return (
    <>
      {state.children}
      {state.isContentRendered && (
        <Portal>
          <slots.content {...restOfContentProps}>
            {!state.noArrow && <div ref={state.arrowRef} className={state.arrowClassName} />}
            {children}
          </slots.content>
        </Portal>
      )}
    </>
  );
};
