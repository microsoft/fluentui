'use client';

import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import type { TooltipProps } from './Tooltip.types';
import { renderTooltip } from './renderTooltip';
import { useTooltip } from './useTooltip';
import { useTooltipStyles } from './useTooltipStyles.styles';

/**
 * Tooltip renders a non-modal floating label or description anchored to a trigger element.
 */
export const Tooltip = (props: TooltipProps): JSXElement => {
  const state = useTooltip(props);

  useTooltipStyles(state);

  return renderTooltip(state);
};

Tooltip.displayName = 'Tooltip';
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
