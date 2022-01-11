import * as React from 'react';
import { useTooltip_unstable } from './useTooltip';
import { renderTooltip_unstable } from './renderTooltip';
import { useTooltipStyles_unstable } from './useTooltipStyles';
import type { TooltipProps } from './Tooltip.types';

/**
 * A tooltip provides light weight contextual information on top of its target element.
 */
export const Tooltip = React.forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const state = useTooltip_unstable(props, ref);

  useTooltipStyles_unstable(state);
  return renderTooltip_unstable(state);
}) as React.FC<TooltipProps>;

Tooltip.displayName = 'Tooltip';
