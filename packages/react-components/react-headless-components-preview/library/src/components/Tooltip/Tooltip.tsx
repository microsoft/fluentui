'use client';

import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
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

/**
 * Marks the Tooltip component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
