import * as React from 'react';
import { useTooltipProvider } from './useTooltipProvider';
import { TooltipProviderProps } from './TooltipProvider.types';
import { renderTooltipProvider } from './renderTooltipProvider';

/**
 * Provides the context for TooltipTriggers to render and display tooltips
 *
 * {@docCategory TooltipProvider}
 */
export const TooltipProvider = React.forwardRef<HTMLElement, TooltipProviderProps>((props, ref) => {
  const state = useTooltipProvider(props, ref);
  return renderTooltipProvider(state);
});

TooltipProvider.displayName = 'TooltipProvider';
