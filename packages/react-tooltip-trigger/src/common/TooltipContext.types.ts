import * as React from 'react';
import { TooltipManager } from './TooltipManager.types';
import { TooltipProps } from './TooltipProps.types';

/**
 * {@docCategory TooltipProvider}
 */
export type TooltipContext = {
  manager: TooltipManager | undefined;
  portalRoot: HTMLElement;
  Tooltip: React.FC<TooltipProps & React.RefAttributes<HTMLElement>>;
};
