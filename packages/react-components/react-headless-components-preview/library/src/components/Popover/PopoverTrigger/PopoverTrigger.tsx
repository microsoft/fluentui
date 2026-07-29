'use client';

import type * as React from 'react';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import type { PopoverTriggerProps } from './PopoverTrigger.types';
import { usePopoverTrigger } from './usePopoverTrigger';
import { renderPopoverTrigger } from './renderPopoverTrigger';

/**
 * Headless PopoverTrigger component.
 *
 * Wraps a trigger element, applying event handlers and ARIA attributes
 * for popover interaction.
 */
export const PopoverTrigger: React.FC<PopoverTriggerProps> = props => {
  const state = usePopoverTrigger(props);
  return renderPopoverTrigger(state);
};

PopoverTrigger.displayName = 'PopoverTrigger';

/**
 * Marks the PopoverTrigger component as a FluentTriggerComponent by setting the isFluentTriggerComponent flag.
 * Uses type-casting to avoid exposing internal types in the public API.
 */
(PopoverTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
