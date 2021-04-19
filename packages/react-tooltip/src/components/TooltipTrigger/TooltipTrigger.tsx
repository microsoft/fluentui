import * as React from 'react';
import { useTooltipTrigger } from './useTooltipTrigger';
import { TooltipTriggerProps } from './TooltipTrigger.types';
import { renderTooltipTrigger } from './renderTooltipTrigger';

/**
 * Wrap an element that will trigger a tooltip when focused or moused over.
 *
 * {@docCategory TooltipTrigger}
 */
export const TooltipTrigger: React.FunctionComponent<TooltipTriggerProps> = props => {
  const state = useTooltipTrigger(props);
  return renderTooltipTrigger(state);
};

TooltipTrigger.displayName = 'TooltipTrigger';
