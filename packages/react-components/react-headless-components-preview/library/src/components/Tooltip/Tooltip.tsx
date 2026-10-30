'use client';

import type * as React from 'react';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { useTooltip } from './useTooltip';
import { renderTooltip } from './renderTooltip';
import type { TooltipProps } from './Tooltip.types';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * Tooltip renders a non-modal floating label or description anchored to a trigger element.
 */
export const Tooltip: React.FC<TooltipProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Tooltip',
  useTooltip,
  renderTooltip,
);

/**
 * Marks the Tooltip component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
