import * as React from 'react';
import { TooltipManager } from './TooltipManager.types';

/**
 * The context provided by TooltipProvider
 * {@docCategory Tooltip}
 */
export type TooltipContextType = {
  /**
   * The instance of TooltipManager
   */
  tooltipManager?: TooltipManager;
};

/**
 * Context shared by all of the tooltips in the app
 * {@docCategory Tooltip}
 */
export const TooltipContext = React.createContext<TooltipContextType>({});
