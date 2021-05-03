import * as React from 'react';
import { TooltipManager } from '../TooltipManager/TooltipManager.types';

/**
 * {@docCategory TooltipProvider}
 */
export interface TooltipProviderProps {
  children?: React.ReactNode;
}

/**
 * {@docCategory TooltipProvider}
 */
export type TooltipProviderState = TooltipProviderProps & {
  tooltipManagerRef: React.MutableRefObject<TooltipManager | undefined>;
};
