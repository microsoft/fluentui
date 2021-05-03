import * as React from 'react';
import { TooltipManager } from '../TooltipManager/TooltipManager.types';

/**
 * The context provided by TooltipProvider
 *
 * {@docCategory TooltipProvider}
 */
export type TooltipContext = {
  /**
   * The instance of TooltipManager
   */
  tooltipManagerRef: React.MutableRefObject<TooltipManager | undefined>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const internal__TooltipContext = React.createContext<TooltipContext>({
  tooltipManagerRef: { current: undefined },
});

export const useTooltipContext = () => React.useContext(internal__TooltipContext);
