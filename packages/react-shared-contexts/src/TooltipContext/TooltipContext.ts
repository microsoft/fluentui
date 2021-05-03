import * as React from 'react';
import { useFluent } from '../ProviderContext/ProviderContext';
import { TooltipManager, TooltipManagerCreateFunction } from './TooltipManager.types';

/**
 * The context provided by TooltipProvider
 *
 * {@docCategory TooltipProvider}
 */
export type TooltipContext = {
  /**
   * The instance of TooltipManager
   */
  tooltipManager?: TooltipManager;

  /**
   * The number of components using the TooltipManager.
   * This is internal to useTooltipManager and shouldn't be otherwise modified.
   */
  useCount: number;
};

/**
 * Context shared by all of the tooltips in the app
 */
export const TooltipContext = React.createContext<TooltipContext>({ useCount: 0 });

/**
 *
 * @param createTooltipManager Function to create the TooltipManager if it doesn't exist yet
 * @returns
 */
export const useTooltipManager = (createTooltipManager: TooltipManagerCreateFunction) => {
  const { targetDocument } = useFluent();

  const context = React.useContext(TooltipContext);
  if (!context.tooltipManager) {
    context.tooltipManager = createTooltipManager(targetDocument);
  }

  React.useEffect(() => {
    context.useCount++;

    return () => {
      context.useCount--;
      if (context.useCount === 0) {
        context.tooltipManager?.destroy();
        context.tooltipManager = undefined;
      }
    };
  }, [context]);

  return context.tooltipManager;
};
