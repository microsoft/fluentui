import * as React from 'react';

/**
 * The context provided by TooltipProvider
 */
export type TooltipContextType = {
  /**
   * When a tooltip is shown, it sets itself as the visibleTooltip.
   * The next tooltip to become visible can use it to hide the previous tooltip immediately.
   */
  visibleTooltip?: {
    hide: () => void;
  };
};

/**
 * Context shared by all of the tooltips in the app
 */
export const TooltipContext = React.createContext<TooltipContextType>({});
