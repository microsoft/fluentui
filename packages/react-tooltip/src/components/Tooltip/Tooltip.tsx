import * as React from 'react';
import { useTooltip } from './useTooltip';
import { renderTooltip } from './renderTooltip';
import { useTooltipStyles } from './useTooltipStyles';
import type { TooltipProps } from './Tooltip.types';

/**
 * A tooltip provides light weight contextual information on top of its target element.
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const state = useTooltip(props, ref);

  useTooltipStyles(state);
  return renderTooltip(state);
});

Tooltip.displayName = 'Tooltip';
