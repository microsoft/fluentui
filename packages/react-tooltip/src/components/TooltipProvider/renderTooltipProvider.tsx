import * as React from 'react';
import { TooltipProviderState } from './TooltipProvider.types';
import { getSlots } from '@fluentui/react-utilities';
import { Tooltip } from '../../Tooltip';
import { internal__TooltipContext } from '../../common/useTooltipContext';

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
        manager: state.manager,
        portalRoot: state.portalRoot,
        Tooltip,
      }}
    >
      {children}
      <slots.root {...rootProps} />
    </internal__TooltipContext.Provider>
  );
};
