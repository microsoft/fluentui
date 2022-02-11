import * as React from 'react';
import { useTooltip_unstable } from './useTooltip';
import type { TooltipProps } from './Tooltip.types';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';

/**
 * A tooltip provides light weight contextual information on top of its target element.
 */
export const Tooltip: React.FC<TooltipProps> & FluentTriggerComponent = props => {
  const [state, render] = useTooltip_unstable(props);
  return render(state);
};

Tooltip.displayName = 'Tooltip';
Tooltip.isFluentTriggerComponent = true;
