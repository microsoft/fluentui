import * as React from 'react';
import { useTooltipProvider } from './useTooltipProvider';
import { TooltipProviderProps } from './TooltipProvider.types';
import { renderTooltipProvider } from './renderTooltipProvider';

/**
 * Provides the context for TooltipTriggers to render and display tooltips
 *
 * {@docCategory TooltipProvider}
 */
export const TooltipProvider: React.FC<TooltipProviderProps> = props => {
  const state = useTooltipProvider(props);
  return renderTooltipProvider(state);
};

TooltipProvider.displayName = 'TooltipProvider';
