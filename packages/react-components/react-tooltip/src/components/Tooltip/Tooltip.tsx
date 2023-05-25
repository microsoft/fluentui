import * as React from 'react';
import { useTooltip_unstable } from './useTooltip';
import { renderTooltip_unstable } from './renderTooltip';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTooltipStyles_unstable } from './useTooltipStyles.styles';
import type { TooltipProps } from './Tooltip.types';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';

/**
 * A tooltip provides light weight contextual information on top of its target element.
 */
export const Tooltip: React.FC<TooltipProps> = props => {
  const state = useTooltip_unstable(props);

  useTooltipStyles_unstable(state);

  useCustomStyleHook_unstable('useTooltipStyles_unstable')(state);

  return renderTooltip_unstable(state);
};

Tooltip.displayName = 'Tooltip';
// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
