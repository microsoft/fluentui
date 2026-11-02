'use client';

import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { usePopoverTrigger } from './usePopoverTrigger';
import { renderPopoverTrigger } from './renderPopoverTrigger';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../../utils/composeComponent';
import type { PopoverTriggerProps } from './PopoverTrigger.types';

/**
 * Headless PopoverTrigger component.
 *
 * Wraps a trigger element, applying event handlers and ARIA attributes
 * for popover interaction.
 */
export const PopoverTrigger: ComponentWithoutRef<PopoverTriggerProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'PopoverTrigger',
  usePopoverTrigger,
  renderPopoverTrigger,
);

/**
 * Marks the PopoverTrigger component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(PopoverTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
