import * as React from 'react';
import { TooltipProviderState } from './TooltipProvider.types';
import { getSlots } from '@fluentui/react-utilities';
import { Tooltip } from '../../Tooltip';
import { internal__TooltipContext } from '@fluentui/react-tooltip-trigger';

/**
 * Render the final JSX of TooltipProvider
 * {@docCategory TooltipProvider}
 */
export const renderTooltipProvider = (state: TooltipProviderState) => {
  const { slots, slotProps } = getSlots(state, []);

  const { children, ...rootProps } = slotProps.root;

  return (
    <internal__TooltipContext.Provider
      value={{
        tooltipManager: state.tooltipManager,
        tooltipContainer: state.tooltipContainer,
        TooltipComponent: Tooltip,
      }}
    >
      {children}
      <slots.root {...rootProps} />
    </internal__TooltipContext.Provider>
  );
};
