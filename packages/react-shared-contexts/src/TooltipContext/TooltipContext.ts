import * as React from 'react';

/**
 * The context provided by TooltipProvider
 * {@docCategory Tooltip}
 */
export type TooltipContextType = {
  /**
   * When a tooltip is shown, it sets this hide function on the context.
   * The next tooltip to become visible will use it to hide the previous tooltip immediately.
   */
  hideVisibleTooltip?: () => void;
};

/**
 * Context shared by all of the tooltips in the app
 * {@docCategory Tooltip}
 */
export const TooltipContext = React.createContext<TooltipContextType>({});
