'use client';

import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { useTooltip } from './useTooltip';
import { renderTooltip } from './renderTooltip';
import { composeComponentWithoutRef } from '../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../utils/composeComponent';
import type { TooltipProps } from './Tooltip.types';

/**
 * Tooltip renders a non-modal floating label or description anchored to a trigger element.
 */
export const Tooltip: ComponentWithoutRef<TooltipProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Tooltip',
  useTooltip,
  renderTooltip,
);

/**
 * Marks the Tooltip component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
