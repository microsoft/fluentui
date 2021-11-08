import * as React from 'react';
import { useTooltip } from './useTooltip';
import { renderTooltip } from './renderTooltip';
import { useTooltipStyles } from './useTooltipStyles';
import type { TooltipProps } from './Tooltip.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A tooltip provides light weight contextual information on top of its target element.
 */
export const Tooltip: ForwardRefComponent<TooltipProps> = React.forwardRef((props, ref) => {
  const state = useTooltip(props, ref);

  useTooltipStyles(state);
  return renderTooltip(state);
});

Tooltip.displayName = 'Tooltip';
