import * as React from 'react';
import { useTooltip_unstable } from './useTooltip';
import { renderTooltip_unstable } from './renderTooltip';
import { useTooltipStyles_unstable } from './useTooltipStyles';
import type { TooltipProps } from './Tooltip.types';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';

/**
 * A tooltip provides light weight contextual information on top of its target element.
 */
export const Tooltip: React.FC<TooltipProps> = props => {
  const state = useTooltip_unstable(props);

  useTooltipStyles_unstable(state);
  return renderTooltip_unstable(state);
};

Tooltip.displayName = 'Tooltip';
// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
