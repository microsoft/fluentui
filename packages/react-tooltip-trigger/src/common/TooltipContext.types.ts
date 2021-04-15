import * as React from 'react';
import { TooltipManager } from './TooltipManager.types';
import { TooltipProps } from './TooltipProps.types';

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

  /**
   * The root portal element for the tooltip
   */
  tooltipContainer: HTMLElement | undefined;
};
