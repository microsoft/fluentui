'use client';

import type * as React from 'react';
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
