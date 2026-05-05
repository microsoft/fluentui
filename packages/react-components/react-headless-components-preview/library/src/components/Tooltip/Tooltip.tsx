'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import { useTooltip } from './useTooltip';
import { renderTooltip } from './renderTooltip';
import type { TooltipProps } from './Tooltip.types';

/**
 * Tooltip renders a non-modal floating label or description anchored to a trigger element.
 */
export const Tooltip = (props: TooltipProps): JSXElement => {
  const state = useTooltip(props);
  return renderTooltip(state);
};

Tooltip.displayName = 'Tooltip';
