import * as React from 'react';
import { TooltipProps } from '../Tooltip/Tooltip.types';
import { TooltipManager } from './useTooltipManager';

/**
 * The context provided by TooltipProvider
 *
 * {@docCategory TooltipProvider}
 */
export type TooltipContext = {
  /**
   * The Tooltip component
   */
  TooltipComponent: React.FC<TooltipProps & React.RefAttributes<HTMLElement>>;

  /**
   * The instance of TooltipManager
   */
  tooltipManager: TooltipManager | undefined;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__TooltipContext = React.createContext<TooltipContext>({
  // These default values are replaced by TooltipProvider
  TooltipComponent: () => null, // eslint-disable-line @typescript-eslint/naming-convention
  tooltipManager: undefined,
});

export const useTooltipContext = () => React.useContext(internal__TooltipContext);
